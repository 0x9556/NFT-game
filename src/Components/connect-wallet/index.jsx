import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentAccount } from '../../store'
import { ConnectWallectWrapper } from './style'
const ConnectWallet = () => {
    const dispatch = useDispatch()

    const connectWallet = async () => {
        const { ethereum } = window
        if (ethereum) try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            })
            const currentAccount = (accounts.length !== 0 && typeof (accounts) === "object")
                ? accounts[0] : null
            dispatch(setCurrentAccount(currentAccount))
        } catch (error) {
            console.log(error)
        }
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