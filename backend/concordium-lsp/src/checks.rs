use concordium_rust_sdk::id::constants::ArCurve;
use concordium_rust_sdk::id::elgamal::PublicKey;
use concordium_rust_sdk::types::smart_contracts::concordium_contracts_common::AccountAddress;
use concordium_rust_sdk::types::{ AccountInfo, AccountStakingInfo, BakerId };
use concordium_rust_sdk::v2::Status;
use concordium_rust_sdk::cis2::Event;
use concordium_rust_sdk::cis2::TokenId;
use crate::CommonError;

pub fn check_min_amount(
    amount: u64,
    min_amount: u64,
    action_name: &str
) -> ProgramResult {
    if amount >= min_amount {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
            (
                    "{}: Number too low {} (min is {})",
                    action_name,
                    amount,
                    min_amount,
                )
            )
        )
    }
}

pub fn check_address(
    actual_address: &AccountAddress,
    reference_address: &AccountAddress,
    field_name: &str,
) -> ProgramResult {
    if actual_address == reference_address {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
        (
                    "Invalid {} address: expected {} got {}",
                    field_name,
                    reference_address,
                    actual_address,
                )
            )
        )
    }
}

pub fn check_owner_program(
    account: &AccountInfo,
    owner: &PublicKey<ArCurve>,
    field_name: &str,
) -> ProgramResult {
    let actual_owner = account.account_encryption_key;
    if actual_owner == owner {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
        (
                    "Invalid {} owner_program: expected {} got {}",
                    field_name,
                    owner,
                    actual_owner,
                )
            )
        )
    }
}

pub fn check_mint_authority(
    mint: &Event::Mint,
    mint_authority: &AccountAddress,
    field_name: &str,
) -> ProgramResult {
    if mint.owner == mint_authority {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
        (
                    "Invalid {} mint authority: expected {} got {}",
                    field_name,
                    mint,
                    mint_authority,
                )
            )
        )
    }
}

// Skipped check_freeze_authority

pub fn check_mint_empty(
    mint: &Event::Mint,
    field_name: &str,
) -> ProgramResult {
    if mint.amount == 0 {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
        (
                    "Non empty mint {} amount: {}",
                    field_name,
                    mint.amount,
                )
            )
        )
    }
}

pub fn check_token_mint(
    token: &TokenId,
    mint: &Event::Mint,
    field_name: &str,
) -> ProgramResult {
    if token == mint.token_id {
        Ok(())
    } else {
        Err(
            Status::invalid_argument(
        (
                    "Invalid token {} mint {}. Expected {}",
                    field_name,
                    token,
                    mint,
                )
            )
        )
    }
}

// Skipped check_token_owner

pub fn check_stake_amount_and_validator(
    staking_info: AccountStakingInfo,
    expected_stake_amount: u64,
    validator_vote_pubkey: &BakerId,
) -> ProgramResult {
    /* TODO: Implement this function from
    https://github.com/marinade-finance/liquid-staking-program/blob/main/programs/marinade-finance/src/checks.rs#L123
    */
}
