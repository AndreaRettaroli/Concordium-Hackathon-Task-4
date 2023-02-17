import React from 'react'
import Container from '../UI/Container/Container'
import Form from '../UI/form/form'
import style from './StakeContainer.module.css'

const StakeContainer = () => {
  return (
    <Container>
      <h1 className={style.title}>Stake</h1>
      <Form />
    </Container>
  )
}

export default StakeContainer
