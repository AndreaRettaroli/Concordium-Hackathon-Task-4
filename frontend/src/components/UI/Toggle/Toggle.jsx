import React from 'react'
import style from './Toggle.module.css'

const Toggle = ({ isStakeActive, setIsStakeActive }) => {
  const onClick = () => {
    setIsStakeActive((prev) => !prev)
  }
  return (
    <div className={style.toggle}>
      <button
        className={style.button}
        onClick={onClick}
        disabled={isStakeActive}
      >
        Stake
      </button>
      <button
        className={style.button}
        onClick={onClick}
        disabled={!isStakeActive}
      >
        Unstake
      </button>
    </div>
  )
}

export default Toggle
