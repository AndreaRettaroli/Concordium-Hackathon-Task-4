import './App.css'
import {WithWalletConnector} from '@concordium/react-components';
import LiquidStaking from "./pages/LiquidStaking";
import {testnet} from "./helpers/config";


function App() {
	return (
		<div className="App">
			<WithWalletConnector network={testnet}>
				{(props) => <LiquidStaking {...props} />}
			</WithWalletConnector>
		</div>
	)
}

export default App
