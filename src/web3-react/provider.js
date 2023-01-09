import React, { createContext, useContext } from 'react'

import { useWeb3Provider } from './hooks'
const Web3Context = createContext(undefined)

export function Web3ReactProvider({ children, connector }) {
    const provider = useWeb3Provider(connector)
   
    return (
        <Web3Context.Provider
            value={{
                provider,
            }}>
            {children}
        </Web3Context.Provider>
    )
}