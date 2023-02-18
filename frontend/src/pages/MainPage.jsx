import React, { useState } from 'react'
import Header from '../components/header/Header'
import DescriptionContainer from '../components/DescriptionContainer/DescriptionContainer'
import StakeContainer from '../components/StakeContainer/StakeContainer'
import UnstakeContainer from '../components/UnstakeContainer/UnstakeContainer'
import Toggle from '../components/UI/Toggle/Toggle'

const MainPage = () => {
  const isConnect = true
  const [isStakeActive, setIsStakeActive] = useState(false)
  return (
    <>
      <Header />
      <Toggle
        isStakeActive={isStakeActive}
        setIsStakeActive={setIsStakeActive}
      />
      {!isConnect && <DescriptionContainer />}
      {isConnect && isStakeActive && <StakeContainer />}
      {isConnect && !isStakeActive && <UnstakeContainer />}
    </>
  )
}

export default MainPage
