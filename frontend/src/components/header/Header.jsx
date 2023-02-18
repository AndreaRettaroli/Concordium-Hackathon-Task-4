import React from 'react'
import Wallet from '../../hooks/useWallet'
import style from './Header.module.css'

const Header = ({ client, connectedAccount, setConnectedAccount }) => {
  return (
    <div className={style.header} id="header">
      <h1 className={style.title}>Liquid Finance</h1>
      <Wallet
        client={client}
        connectedAccount={connectedAccount}
        setConnectedAccount={setConnectedAccount}
      />
    </div>
  )
}

export default Header
