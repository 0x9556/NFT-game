import { useContract } from './useContract'
import { formatCharacterData } from '../utils/formatCharacterData'
import { useMemo } from 'react'

export function useDefaultCharacters() {
    const contract = useContract()
    return useMemo(async () => {
        const defaultCharactersMetaData = await contract.getAllDefaultCharacters()
        return defaultCharactersMetaData.map(item =>
            formatCharacterData(item))
    }, [contract])
}

export function useUserCharacters() {
    const contract = useContract()
    return useMemo(async () => {
        const userHasNft = await contract.checkIfUserHasNft()
        if (userHasNft) {
            const characterIndexes = await contract.getcharacters()
            const charactersMetaData = characterIndexes.map(item =>
                contract.nftAttributes(item).then(res => res))
            return charactersMetaData.map(item => formatCharacterData(item))
        }
    },[])
}