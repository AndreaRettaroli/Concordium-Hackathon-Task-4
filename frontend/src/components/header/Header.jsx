import React from 'react'
import Button from '../UI/button/Button'
import style from './Header.module.css'

const Header = () => {
  return (
    <div className={style.header} id="header">
      <h1 className={style.title}>Project Title</h1>
      <Button onClick={() => console.log('prova')}>Connect Wallet</Button>
    </div>
  )
}

export default Header
