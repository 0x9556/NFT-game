import React, { memo} from 'react'
import { ConnectWallectWrapper } from './style'
import { useWeb3React } from '@web3-react/core'

const ConnectWallet = () => {
    const { connector } = useWeb3React()
    const connectWallet = () => {
        connector.activate()
    }

    return (
        <ConnectWallectWrapper>
            <div className="connect-wallet-container">
                <button
                    className="cta-button connect-wallet-button"
                    onClick={() => connectWallet()} >
                    Connect Wallet To Get Started
                </button>
            </div>
        </ConnectWallectWrapper>
    )
}

export default memo(ConnectWallet)