import React from 'react'
import style from './Button.module.css'

const Button = (props) => {
  const className = props.connectWalletButton
    ? style.button
    : props.submitButton
    ? style.formButton
    : props.connected
    ? style.connected
    : style.formButton

  console.log(props.connected)
  return (
    <button onClick={props.onClick} type={props.type} className={className}>
      {props.children}
    </button>
  )
}

export default Button
