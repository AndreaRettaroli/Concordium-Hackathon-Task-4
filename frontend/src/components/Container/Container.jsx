import React from 'react'
import Button from '../UI/button/Button'
import style from './Container.module.css'

const Container = () => {
  return (
    <div className={style.mainContainer}>
      <div>
        <h1 className={style.title}>Welcome!</h1>
        <p className={style.text}>
          This is a Concordium Liquid Staking protocol. <br />
          Secure Concordium and earn rewards without your funds locked in.
          <br />
          Get lqCCD, staked CCD supported all across the Concordium ecosystem.
        </p>
      </div>
      <div>
        <Button>Connect Wallet</Button>
      </div>
    </div>
  )
}

export default Container
