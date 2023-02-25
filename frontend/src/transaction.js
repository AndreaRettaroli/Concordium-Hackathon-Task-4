/**
 * Example methods for implement backend;
 * You need to change method to our method
 */
import { AccountTransactionType, CcdAmount } from '@concordium/web-sdk';
import { MAX_CONTRACT_EXECUTION_ENERGY } from './config';

function contractUpdatePayload(amount, contract, method) {
  return {
    amount,
    address: {
      index: contract.index,
      subindex: BigInt(0),
    },
    receiveName: `${contract.name}.${method}`,
    maxContractExecutionEnergy: MAX_CONTRACT_EXECUTION_ENERGY,
  };
}

export async function submitDeposit(connection, amount, account, contract) {
  return connection.signAndSendTransaction(
    account,
    AccountTransactionType.Update,
    contractUpdatePayload(amount, contract, 'insert'),
    {},
    ''
  );
}

export async function submitSmash(connection, account, contract) {
  return connection.signAndSendTransaction(
    account,
    AccountTransactionType.Update,
    contractUpdatePayload(new CcdAmount(BigInt(0)), contract, 'smash'),
    {},
    ''
  );
}
