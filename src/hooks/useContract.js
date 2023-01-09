
import { useMemo } from 'react'
import { getContract } from '../utils/'
import { CONTRACT_ADDRESS } from '../utils/constants'
import { abi } from '../utils/MyNftGame.json'
import { useWeb3React } from '@web3-react/core'


// export function useContract() {
//     const provider = useWeb3Provider()
//     const signer = provider.getSigner()
//     return useMemo(() => {
//         return getContract(CONTRACT_ADDRESS, abi, provider, signer)
//     }, [provider])
// }


export function useContract(addressOrAddressMap, ABI, withSignerIfPossible = true) {
    const { provider, account, chainId } = useWeb3React()

    return useMemo(() => {
        if (!addressOrAddressMap) return null
        let address
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[chainId]
        if (!address) return null
        try {
            return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, abi, provider, chainId, withSignerIfPossible, account])
}

export function useGameContract() {
    return useContract(CONTRACT_ADDRESS, abi, true)
}