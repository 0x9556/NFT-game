import { useMemo } from 'react'
import { useWeb3Provider } from './useProvider'
import { getContract } from '../utils/'
import { CONTRACT_ADDRESS } from '../utils/constants'
import { abi } from '../utils/MyNftGame.json'

export function useContract() {
    const provider = useWeb3Provider()
    const signer = provider.getSigner()
    return getContract(CONTRACT_ADDRESS, abi, provider, signer)
}