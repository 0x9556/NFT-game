import React, { useEffect, memo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useGameContract } from '../../hooks/useContract'
import { useDefaultCharacters } from '../../hooks/useMetaData'
import Profile from '../profile'
import { SelectCharacterWarapper } from './style'
import { useStore } from '../../state'


const SelectCharacter = () => {
    const contract = useGameContract()
    const defaultCharacters = useDefaultCharacters()
    const [ifUserHasNft, setIfuserHasNft] = useStore(state => [state.ifUserHasNft, state.setIfuserHasNft])
    const setuserCharacterIndices = useStore(state => state.setuserCharacterIndices)
    const { account, chainId } = useWeb3React()

    useEffect(() => {
        if (chainId !== "31337")
            console.log("please connect to local network")
    }, [])

    useEffect(() => {
        const getUserCharacters = async () => {
            const indices = await contract.getCharacters()
            console.log(indices)
            setuserCharacterIndices(indices.map(index => index.toNumber()))
        }
        getUserCharacters()
    }, [account, ifUserHasNft])

    // useEffect(() => {
    //     contract.on("CreateCharacter", onCharacterMint)
    //     return () => {
    //         contract.off("CreateCharacter", onCharacterMint)
    //     }
    // }, [])

    const onCharacterMint = (sender, characterIndex) => {
        if (account === sender.toLowerCase()) {
            setIfuserHasNft(true)
            console.log(
                `CharacterNFTMinted - sender: ${sender}  characterIndex: ${characterIndex.toNumber()}`
            )
        }
    }

    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
                <div className="character-grid">
                    {
                        (!ifUserHasNft && defaultCharacters) &&
                        defaultCharacters.map((item, index) =>
                            <Profile info={item} hasNft={ifUserHasNft} key={index} />)
                    }
                </div>

            </div>
        </SelectCharacterWarapper>
    )
}


export default memo(SelectCharacter)