import { ethers } from 'ethers'
import { useMemo } from 'react'

export function useWeb3Provider() {
    const { ethereum } = window
    return useMemo(() => {
        return new ethers.providers.Web3Provider(ethereum)
    }, [ethereum])

}