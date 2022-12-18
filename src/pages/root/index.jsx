import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAccount, setIfuserHasNft } from '../../store'
import { RootWrapper } from './style'
import { useContract } from '../../hooks/useContract'
import ConnectWallet from '../../Components/connect-wallet'
import SelectCharacter from '../../Components/select-character'
import Arena from '../../Components/arena'

export default function Root() {

  const currentAccount = useSelector(state => state.currentAccount)
  const userHasNft = useSelector(state => state.ifUserHasNft)
  const dispatch = useDispatch()
  const contract = useContract()

  useEffect(() => {
    const checkIfWalletConnect = async () => {
      const { ethereum } = window
      if (ethereum) {
        const currentAccount = await ethereum.request({
          method: "eth_accounts"
        })
        if (currentAccount.length !== 0)
          dispatch(setCurrentAccount(currentAccount[0]))
      }
    }
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
    if (!currentAccount)
      return <ConnectWallet />

    if (currentAccount && !userHasNft)
      return <SelectCharacter />
    
    if (currentAccount && userHasNft)
      return <Arena/>
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


