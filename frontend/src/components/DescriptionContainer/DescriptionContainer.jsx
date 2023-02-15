import React from 'react'
import Button from '../UI/button/Button'
import Container from '../UI/Container/Container'
import style from './DescriptionContainer.module.css'

const DescriptionContainer = () => {
  return (
    <Container>
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
    </Container>
  )
}

export default DescriptionContainer
