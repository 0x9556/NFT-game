import React from 'react'
import { useDispatch } from 'react-redux'
import { connectWalletAction } from '../../store'
import { ConnectWallectWrapper } from './style'
const ConnectWallet = () => {
    const dispatch = useDispatch()

    return (
        <ConnectWallectWrapper>
            <div className="connect-wallet-container">
                <button
                    className="cta-button connect-wallet-button"
                    onClick={() => { dispatch(connectWalletAction()) }} >
                    Connect Wallet To Get Started
                </button>
            </div>
        </ConnectWallectWrapper>
    )
}

export default ConnectWallet