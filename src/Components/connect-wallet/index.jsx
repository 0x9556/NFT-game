import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentAccount } from '../../store'
import { ConnectWallectWrapper } from './style'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'

const ConnectWallet = () => {
    const injected = new InjectedConnector({ supportedChainIds: [1, 31337] })
    const dispatch = useDispatch()
    const { activate, deactivate } = useWeb3React()

    // useEffect(() => {
    //     const getInfo = async () => {
    //         const provider = await injected.getProvider()
    //         const signer = await injected.getAccount()
    //         console.log(provider)
    //         console.log(signer)
    //     }
    //     getInfo()
    // })

    const connectWallet = async () => {
        // const { ethereum } = window
        // if (ethereum) try {
        //     const accounts = await ethereum.request({
        //         method: "eth_requestAccounts"
        //     })
        //     const currentAccount = (accounts.length !== 0 && typeof (accounts) === "object")
        //         ? accounts[0] : null
        //     dispatch(setCurrentAccount(currentAccount))
        // } catch (error) {
        //     console.log(error)
        // }

        try {
            await activate(injected)
        } catch (error) {
            console.error(error)
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