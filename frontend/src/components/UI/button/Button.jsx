import React from 'react'
import style from './Button.module.css'

const Button = (props) => {
  const className = props.connectWallet
    ? style.button
    : props.submitButton
    ? style.formButton
    : style.button
  return (
    <button onClick={props.onClick} type={props.type} className={className}>
      {props.children}
    </button>
  )
}

export default Button
