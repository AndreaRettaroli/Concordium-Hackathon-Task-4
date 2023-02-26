// Pulling in everything from the smart contract standard library.
use concordium_std::*;
use std::format;

/// The state of liquid pool
#[derive(Debug, Serialize, PartialEq, Eq, Clone, Copy)]
enum LiquidPoolState {
    /// Liquid pool is empty
    Empty,
    /// Not Empty
    NotEmpty,
}

#[derive(Debug, Serialize, SchemaType, PartialEq, Clone)]
pub struct State {
    liquid_pool_state: LiquidPoolState,
}

// #[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType, Default)]
// enum ContractError {
//     /// Failed parsing the parameter.
//     #[from(ParseError)]
//     #[default]
//     ParseParams,
//     /// Failed account transfer.
//     #[from(TransferError)]
//     TransferError,
//     /// Failed contract invoke.
//     ContractError,
//     Unauthenticated,
// }
//
// type ContractResult<A> = Result<A, ContractError>;

#[init(contract = "LiquidPool")]
fn init<S: HasStateApi>(
    _ctx: &impl HasInitContext,
    _state_builder: &mut StateBuilder<S>,
) -> InitResult<State> {
    // Always succeeds
    Ok(State{liquid_pool_state: LiquidPoolState::Empty})
}

/// Deposit CCD into pool
#[receive(contract = "LiquidPool", name = "deposit", mutable, payable)]
fn deposit<S: HasStateApi>(
    _ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State, StateApiType = S>,
    _amount: Amount,
) -> ReceiveResult<()> {
    host.state_mut().liquid_pool_state = LiquidPoolState::NotEmpty;
    Ok(())
}

/// Withdraw CCD from pool
#[receive(contract = "LiquidPool", name = "withdraw", mutable, payable)]
fn withdraw<S: HasStateApi>(
    ctx: &impl HasReceiveContext,
    host: &mut impl HasHost<State, StateApiType = S>,
    amount: Amount,
) -> ReceiveResult<()> {
    let invoker = ctx.invoker();

    // Ensure pool is not empty
    ensure!(host.state().liquid_pool_state == LiquidPoolState::NotEmpty);

    // Ensure amount, user wants to withdraw is less or equals to liquid pool
    ensure!(host.self_balance() >= amount);

    if host.self_balance() - amount == Amount::zero() {
        host.state_mut().liquid_pool_state = LiquidPoolState::Empty;
    }

    Ok(host.invoke_transfer(&invoker, amount)?)
}

/// View pool state and balance
#[receive(contract = "LiquidPool", name = "view")]
fn view<S: HasStateApi>(
    _ctx: &impl HasReceiveContext,
    host: &impl HasHost<State, StateApiType = S>,
) -> ReceiveResult<(LiquidPoolState, Amount)> {
    let current_state = host.state().liquid_pool_state;
    let current_balance = host.self_balance();
    Ok((current_state, current_balance))
}

// Unit tests for the smart contract "PiggyBank"
#[concordium_cfg_test]
mod tests {
    use super::*;
    // Pulling in the testing utils found in concordium_std.
    use test_infrastructure::*;

    // Running the initialization ensuring nothing fails and the state of the
    // piggy bank is intact.
    #[concordium_test]
    fn test_init() {
        // Setup
        let ctx = TestInitContext::empty();
        let mut state_builder = TestStateBuilder::new();

        // Call the init function
        let state_result = init(&ctx, &mut state_builder);

        // Inspect the result
        let state = state_result.expect_report("Contract initialization results in error.");

        claim_eq!(
            state.liquid_pool_state,
            LiquidPoolState::Empty,
            "Liquid pool state must be Empty on init."
        );
    }

    #[concordium_test]
    fn test_deposit() {
        // Setup
        let ctx = TestReceiveContext::empty();
        let mut host = TestHost::new(State { liquid_pool_state: LiquidPoolState::Empty }, TestStateBuilder::new());
        let amount = Amount::from_micro_ccd(100);

        // Trigger deposit
        let result = deposit(&ctx, &mut host, amount);

        claim!(result.is_ok(), "CCD deposit results in error");
        assert_eq!(
            host.state().liquid_pool_state,
            LiquidPoolState::NotEmpty,
            "Liquid pool state must become NotEmpty."
        );
    }

    #[concordium_test]
    fn test_withdraw() {
        // Setup the context

        let mut ctx = TestReceiveContext::empty();
        let invoker = AccountAddress([0u8; 32]);
        ctx.set_invoker(invoker);
        let mut host = TestHost::new(State { liquid_pool_state: LiquidPoolState::NotEmpty }, TestStateBuilder::new());

        let balance = Amount::from_micro_ccd(500);
        host.set_self_balance(balance);

        let amount: Amount = Amount::from_micro_ccd(100);

        // Trigger withdraw
        let result = withdraw(&ctx, &mut host, amount);

        // Inspect the result
        claim!(result.is_ok(), "CCD withdrawing results in error.");
        claim_eq!(
            host.get_transfers(),
            [(invoker, amount)],
            "Withdrawing did not produce the correct transfers."
        );
    }
}
