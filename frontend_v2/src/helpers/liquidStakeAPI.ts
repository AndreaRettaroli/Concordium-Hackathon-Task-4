import {LP_CONTRACT_NAME, LP_INDEX, LP_RAW_SCHEMA, LP_SUBINDEX} from "./config";
import {AccountTransactionType, CcdAmount, UpdateContractPayload,} from '@concordium/web-sdk';
import {WalletConnection} from "@concordium/react-components";

export async function deposit(connection: WalletConnection, account: string, amount: number,) {
	return connection.signAndSendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: new CcdAmount(BigInt(amount)),
			address: {
				index: LP_INDEX,
				subindex: LP_SUBINDEX,
			},
			receiveName: `${LP_CONTRACT_NAME}.deposit`,
			maxContractExecutionEnergy: 30000n,
		} as UpdateContractPayload,
		{},
		LP_RAW_SCHEMA
	);
}

export async function withdraw(connection: WalletConnection, account: string, amount: number) {
	return connection.signAndSendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: new CcdAmount(BigInt(amount)),
			address: {
				index: LP_INDEX,
				subindex: LP_SUBINDEX,
			},
			receiveName: `${LP_CONTRACT_NAME}.withdraw`,
			maxContractExecutionEnergy: 30000n,
		} as UpdateContractPayload,
		{},
		LP_RAW_SCHEMA
	);
}
export async function view(connection: WalletConnection, account: string) {
	return connection.signAndSendTransaction(
		account,
		AccountTransactionType.Update,
		{
			amount: new CcdAmount(0n),
			address: {
				index: LP_INDEX,
				subindex: LP_SUBINDEX,
			},
			receiveName: `${LP_CONTRACT_NAME}.view`,
			maxContractExecutionEnergy: 30000n,
		} as UpdateContractPayload,
		{},
		LP_RAW_SCHEMA
	);
}

