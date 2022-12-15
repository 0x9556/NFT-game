import React, { memo } from 'react'
import { ConnectWallectWrapper } from './style'
const ConnectWallet = memo(({ setAccount }) => {

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
        <ConnectWallectWrapper>
            <div className="connect-wallet-container">
                <button
                    className="cta-button connect-wallet-button"
                    onClick={connectWalletAction} >
                    Connect Wallet To Get Started
                </button>
            </div>
        </ConnectWallectWrapper>
    )
})

export default ConnectWallet