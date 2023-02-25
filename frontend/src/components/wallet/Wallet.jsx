import {
  AccountTransactionType,
  CcdAmount,
  ModuleReference,
  serializeUpdateContractParameters,
  toBuffer,
} from '@concordium/web-sdk'

import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers'
import Button from '../UI/button/Button'

export async function init(setConnectedAccount) {
  const client = await detectConcordiumProvider()
  // Listen for relevant events from the wallet.
  client.on('accountChanged', (account) => {
    console.debug('browserwallet event: accountChange', { account })
    setConnectedAccount(account)
  })
  client.on('accountDisconnected', () => {
    console.debug('browserwallet event: accountDisconnected')
    client.getMostRecentlySelectedAccount().then(setConnectedAccount)
  })
  client.on('chainChanged', (chain) => {
    console.debug('browserwallet event: chainChanged', { chain })
  })
  client.getMostRecentlySelectedAccount().then(setConnectedAccount)

  return client
}

export async function connect(client, setConnectedAccount) {
  const account = await client.connect()
  return setConnectedAccount(account)
}

export function disconnect(setConnectedAccount) {
  return setConnectedAccount()
}

export default function Wallet(props) {
  const { client, connectedAccount, setConnectedAccount } = props
  console.log(
    '🚀 ~ file: useWallet.jsx:37 ~ Wallet ~ { client, connectedAccount, setConnectedAccount } ',
    { client, connectedAccount },
  )
  return (
    <>
      {!connectedAccount && (
        <>
          <Button
            connectWalletButton
            onClick={() =>
              connect(client, setConnectedAccount).catch(console.error)
            }
          >
            Connect Wallet
          </Button>
        </>
      )}
      {connectedAccount && (
        <Button
          connected
          onClick={() => disconnect(setConnectedAccount).catch(console.error)}
        >
          Disconnect <code>{connectedAccount.slice(0, 8).concat('.')}</code>.
        </Button>
      )}
    </>
  )
}
