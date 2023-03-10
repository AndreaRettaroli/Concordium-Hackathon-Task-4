import React from 'react'
import Container from '../UI/Container/Container'
import Form from '../UI/form/Form'
import style from './StakeContainer.module.css'

const StakeContainer = () => {
  return (
    <Container>
      <h1 className={style.title}>Stake</h1>
      <div>
        <p className={style.text}>Stake your CCDs</p>
      </div>
      <Form />
    </Container>
  )
}

export default StakeContainer
