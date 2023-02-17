import React from 'react'
import Container from '../UI/Container/Container'
import Form from '../UI/form/form'
import style from './UnstakeContainer.module.css'

const UnstakeContainer = () => {
  return (
    <Container>
      <h1 className={style.title}>Unstake</h1>
      <Form />
    </Container>
  )
}

export default UnstakeContainer
