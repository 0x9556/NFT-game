import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { useOrderedConnections } from '../../hooks/useOrderedConnections'
export default function Web3Provider({ children }) {

    const connections = useOrderedConnections()
    const connector = connections.map(({ hooks, connector }) => [connector, hooks])

    return (
        <Web3ReactProvider connectors={connector}>
            {children}
        </Web3ReactProvider>
    )
}
