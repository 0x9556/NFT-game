import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import { store } from './store'
import router from './router'
import './index.css'

function getWeb3Provider(provider,connector) {
    return new providers.Web3Provider(provider)
}

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Web3ReactProvider getLibrary={getWeb3Provider} >
            <RouterProvider router={router} />
        </Web3ReactProvider>
    </Provider>
)
