import {useConnection, WalletConnectionProps} from "@concordium/react-components";
import {useEffect, useState} from "react";
import {BROWSER_WALLET} from "../helpers/config";
import {deposit, view, withdraw} from "../helpers/liquidStakeAPI";

function LiquidStaking(props: WalletConnectionProps) {

	const {
		activeConnector,
		setActiveConnectorType,
		connectedAccounts,
		genesisHashes
	} = props;

	const {
		connection,
		setConnection,
		account
	} = useConnection(connectedAccounts, genesisHashes);

	const [amount, setAmount] = useState(100);
	const [hash, setHash] = useState('')
	/**
	 * handle to open browser extension
	 */
	function connectHandle() {
		activeConnector?.connect()
			.then(setConnection)
			.catch(console.error)
	}

	/**
	 * Use effect for connect wallet
	 */
	useEffect(() => setActiveConnectorType(BROWSER_WALLET), []);

	/**
	 * send contract handle
	 */
	function depositHandle() {
		if (connection && account && amount) {
			deposit(connection, account, amount)
				.then(setHash)
				.catch(console.error)
		}
	}

	function withdrawHandle() {
		if (connection && account && amount) {
			withdraw(connection, account, amount)
				.then(setHash)
				.catch(console.error)
		}
	}

	function viewHandle() {
		if (connection && account && amount) {
			view(connection, account)
				.then(setHash)
				.catch(console.error)
		}
	}

	return (
		<div>

			<p>Hello</p>

			<button onClick={connectHandle}>connect wallet</button>

			<p>connected account: {account}</p>

			<p>{amount / 1_000_000}</p>

			<button onClick={() => setAmount(Number(prompt()) * 1_000_000)}>set Amount</button>
			<button onClick={depositHandle}>deposit</button>
			<button onClick={withdrawHandle}>withdraw</button>
			<button onClick={viewHandle}>view</button>

			{hash && (
				<>
					<button
						className="link"
						type="button"
						onClick={() => {
							window.open(
								`https://testnet.ccdscan.io/?dcount=1&dentity=transaction&dhash=${hash}`,
								'_blank',
								'noopener,noreferrer'
							);
						}}
					>
						{hash}
					</button>
					<br />
				</>
			)}

		</div>
	)
}

export default LiquidStaking;
