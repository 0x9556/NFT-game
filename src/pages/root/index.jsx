import React, { useEffect, useState } from 'react'
import { RootWrapper } from './style'
import ConnectWallet from '../../Components/connect-wallet'
import SelectCharacter from '../../Components/select-character'
export default function Root() {

  const [account, setAccount] = useState(null)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    checkIfWalletConnect()
  }, [])

  const checkIfWalletConnect = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("Go get metamask")
        return
      }
      const accounts = await ethereum.request({
        method: "eth_accounts"
      })
      if (accounts)
        setAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const renderContent = () => {
    if (!account)
      return <ConnectWallet setAccount={setAccount} />

    if (account && !characters.length)
      return <SelectCharacter setcharacterNFT={setCharacters} account={account} />
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
