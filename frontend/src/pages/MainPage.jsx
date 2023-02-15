import React from 'react'
import Header from '../components/header/Header'
import DescriptionContainer from '../components/DescriptionContainer/DescriptionContainer'
import StakeContainer from '../components/StakeContainer/StakeContainer'

const MainPage = () => {
  const isConnect = true
  return (
    <>
      <Header />
      {!isConnect && <DescriptionContainer />}
      {isConnect && <StakeContainer />}
    </>
  )
}

export default MainPage
