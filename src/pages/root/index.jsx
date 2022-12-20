import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAccount, setIfuserHasNft } from '../../store'
import { RootWrapper } from './style'
import { useGameContract } from '../../hooks/useContract'
import LoadingIndicator from '../../Components/loadingIndicator'
import ConnectWallet from '../../Components/connect-wallet'
import SelectCharacter from '../../Components/select-character'
import Arena from '../../Components/arena'


export default function Root() {

  const currentAccount = useSelector(state => state.currentAccount)
  const userHasNft = useSelector(state => state.ifUserHasNft)
  const dispatch = useDispatch()
  const contract = useGameContract()
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const checkIfWalletConnect = async () => {
      const { ethereum } = window
      if (ethereum) {
        const currentAccount = await ethereum.request({
          method: "eth_accounts"
        })
        if (currentAccount.length !== 0)
          dispatch(setCurrentAccount(currentAccount[0]))
        setIsLoading(false)
      }
    }
    setIsLoading(true)
    checkIfWalletConnect()
  }, [])

  useEffect(() => {
    const checkIfUserHasNft = async () => {
      if (currentAccount) {
        const ifHasNft = await contract.checkIfUserHasNft(currentAccount)
        dispatch(setIfuserHasNft(ifHasNft))
      }
    }
    checkIfUserHasNft()
  }, [currentAccount])

  const renderContent = () => {
    if (isLoading)
      <LoadingIndicator />
    if (!currentAccount)
      return <ConnectWallet />

    if (currentAccount && !userHasNft)
      return <SelectCharacter />

    if (currentAccount && userHasNft)
      return <Arena />
  }

  return (
    <RootWrapper>
      <div className="App">
        <div className="container">
          <div className="header-container">
            <p className="header gradient-text">⚔️Metaverse Slayer ⚔️</p>
            <p className="sub-text">Team up to protect the Metaverse!</p>
            {renderContent()}
          </div>
        </div>
      </div>
    </RootWrapper>
  )
}


