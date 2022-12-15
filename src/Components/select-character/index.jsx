import React, { memo, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ABI, CONRACT_ADDRESS } from '../../utils/constants'
import { formatCharacterData } from '../../utils/formatCharacterData'
import { SelectCharacterWarapper } from './style'

const SelectCharacter = memo(({ account, setCharacters }) => {
    const [defaultCharacter, setDefaultCharacter] = useState()

    useEffect(() => {
        checkNetwork()
    }, [])

    useEffect(() => {
        fetchNftData()
    }, [account])

    const checkNetwork = () => {
        if (window.ethereum.networkVersion !== "31337")
            console.log("please connect to test network")
    }

    const fetchNftData = async () => {
        const contract = await getContract()
        const ifUserHasNft = await contract.checkIfUserHasNft()
        if (!ifUserHasNft) {
            const CharactersMeta = await contract.getAllDefaultCharacters()
            const defaultCharacterData = CharactersMeta.map(item => formatCharacterData(item))
            setDefaultCharacter(defaultCharacterData)
            console.log(defaultCharacterData)
        } else {
            const characters = await contract.getcharacters()
            setCharacters(characters)
        }

    }

    const getContract = async () => {
        const contractAddress = CONRACT_ADDRESS
        const contractAbi = ABI
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        return new ethers.Contract(contractAddress, contractAbi, signer)
    }

    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
            </div>
        </SelectCharacterWarapper>
    )
})

export default SelectCharacter