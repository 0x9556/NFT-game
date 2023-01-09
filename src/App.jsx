import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import router from './router'
import Web3Provider from './Components/Web3Provider'
import './index.css'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Web3Provider>
            <RouterProvider router={router} />
        </Web3Provider>
    </Provider>
)
