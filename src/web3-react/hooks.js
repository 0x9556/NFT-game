import { useMemo,useState } from 'react'
import { providers } from 'ethers'

const currentAccout = useState(null)

export function useWeb3Provider(connector) {
    const { Web3Provider } = providers
    return useMemo(() => {
        return new Web3Provider(connector)
    }, [connector])

}

export function useAccounts(connector) {

    const accounts = getAccounts(connector)

}

