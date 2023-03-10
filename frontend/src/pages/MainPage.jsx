import React, { useState, useEffect } from 'react'
import Header from '../components/header/Header'
import DescriptionContainer from '../components/descriptionContainer/DescriptionContainer'
import StakeContainer from '../components/stakeContainer/StakeContainer'
import UnstakeContainer from '../components/unstakeContainer/UnstakeContainer'
import Toggle from '../components/UI/Toggle/Toggle'
import { init } from '../components/wallet/Wallet'
import Footer from "../components/footer/Footer.jsx";

const MainPage = () => {
  const [isStakeActive, setIsStakeActive] = useState(true)
  const [client, setClient] = useState()
  const [connectedAccount, setConnectedAccount] = useState()

  // Attempt to initialize Browser Wallet Client.
  useEffect(() => {
    init(setConnectedAccount).then(setClient).catch(console.error)
  }, [])
  console.log(connectedAccount, client)
  return (
    <>
      <Header
        setConnectedAccount={setConnectedAccount}
        client={client}
        connectedAccount={connectedAccount}
      />
      {!connectedAccount ? (
        <DescriptionContainer />
      ) : (
        <>
          <Toggle
            isStakeActive={isStakeActive}
            setIsStakeActive={setIsStakeActive}
          />
          {isStakeActive ? <StakeContainer /> : <UnstakeContainer />}
        </>
      )}
      <Footer/>
    </>
  )
}

export default MainPage
