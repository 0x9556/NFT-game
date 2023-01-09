import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useStore } from '../../state'
import { RootWrapper } from './style'
import { useGameContract } from '../../hooks/useContract'
import LoadingIndicator from '../../Components/loadingIndicator'
import ConnectWallet from '../../Components/connect-wallet'
import SelectCharacter from '../../Components/select-character'
import Arena from '../../Components/arena'


export default function Root() {
  const contract = useGameContract()
  const [isLoading, setIsLoading] = useState(false)
  const [userHasNft, setIfuserHasNft] = useStore(state => [state.ifUserHasNft, state.setIfuserHasNft])
  const { account, connector } = useWeb3React()


  useEffect(() => {
    const checkIfWalletConnect = async () => {
      await connector.connectEagerly()
      setIsLoading(false)
    }
    setIsLoading(true)
    checkIfWalletConnect()
  }, [])

  useEffect(() => {
    const checkIfUserHasNft = async () => {
      if (account) {
        const ifHasNft = await contract.checkIfUserHasNft(account)
        setIfuserHasNft(ifHasNft)
      }
    }
    checkIfUserHasNft()
  }, [account])

  const renderContent = () => {
    if (isLoading)
      <LoadingIndicator />
    if (!account)
      return <ConnectWallet />

    if (account && !userHasNft)
      return <SelectCharacter />

    if (account && userHasNft)
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


