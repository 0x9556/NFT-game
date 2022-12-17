import { useMemo } from 'react'
import { useWeb3Provider } from './useProvider'
import { getContract } from '../utils/'
import { CONTRACT_ADDRESS, ABI } from '../utils/constants'

export function useContract() {
    const provider = useWeb3Provider()
    const signer = provider.getSigner()
    console.log(provider, signer)
    return useMemo(() =>
        getContract(CONTRACT_ADDRESS, ABI, provider, signer)
        , [provider, signer.address])
}