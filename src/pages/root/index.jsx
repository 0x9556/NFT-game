import React, { useEffect, useState } from 'react'
import { RootWrapper } from './style'
export default function Root() {

  const [account, setAccount] = useState(null)


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

  const connectWalletAction = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("Go get metamask")
        return
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      })
      setAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RootWrapper>
      <div className="App">
        <div className="container">
          <div className="header-container">
            <p className="header gradient-text">⚔️Metaverse Slayer ⚔️</p>
            <p className="sub-text">Team up to protect the Metaverse!</p>
            {!account &&
              <div className="connect-wallet-container">
                <button
                  className="cta-button connect-wallet-button"
                  onClick={connectWalletAction}
                >
                  Connect Wallet To Get Started
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </RootWrapper>
  )
}
