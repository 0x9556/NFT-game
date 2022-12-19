import { useMemo, useState } from 'react'
import { useGameContract } from './useContract'
import { formatCharacterData, formateBossData } from '../utils/formatCharacterData'

export function useDefaultCharacters() {
    const contract = useGameContract()
    const [defaultCharacters, setDefaultCharacters] = useState([])
    return useMemo(() => {
        const getDefaultCharacters = async () => {
            const metaData = await contract.getAllDefaultCharacters()
            const defaultCharacters = metaData.map(item => formatCharacterData(item))
            setDefaultCharacters(defaultCharacters)
        }
        getDefaultCharacters()
        console.log("defaultCharacters", defaultCharacters)
        return defaultCharacters
    }, [defaultCharacters.length])
}

export function useCharacter(tokenId, dep) {
    const contract = useGameContract()
    const [characterAttributes, setCharacterAttributes] = useState({})
    return useMemo(() => {
        const getCharacter = async () => {
            const metaData = await contract.nftAttributes(tokenId)
            setCharacterAttributes(formatCharacterData(metaData))
        }
        getCharacter()
        console.log("CharacterAttributes", characterAttributes, dep)
        return characterAttributes
    }, [characterAttributes.characterIndex, tokenId, dep])

}

export function useBoss(dep) {
    const contract = useGameContract()
    const [currentBoss, setCurrentBoss] = useState({})
    return useMemo(() => {
        const getBoss = async () => {
            const metaData = await contract.getCurrentBoss()
            setCurrentBoss(formateBossData(metaData))
        }
        getBoss()
        console.log("currentBoss", currentBoss, dep)
        return currentBoss
    }, [currentBoss.bossIndex, dep])

}