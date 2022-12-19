import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setuserCharacterIndices, setIfuserHasNft } from '../../store'
import { useGameContract } from '../../hooks/useContract'
import { useDefaultCharacters } from '../../hooks/useMetaData'
import Profile from '../profile'
import { SelectCharacterWarapper } from './style'


const SelectCharacter = () => {
    const contract = useGameContract()
    const dispatch = useDispatch()
    const ifUserHasNft = useSelector(state => state.ifUserHasNft)
    const currentAccount = useSelector(state => state.currentAccount)
    const defaultCharacters = useDefaultCharacters()

    useEffect(() => {
        const networkVersion = window.ethereum.networkVersion
        console.log(contract)
        if (networkVersion !== "31337")
            console.log("please connect to local network")
    }, [])

    useEffect(() => {
        const getUserCharacters = async () => {
            const indices = await contract.getCharacters()
            dispatch(setuserCharacterIndices(indices.map(index => index.toNumber())))
        }
        getUserCharacters()
    }, [currentAccount, ifUserHasNft])

    // useEffect(() => {
    //     contract.on("CreateCharacter", onCharacterMint)
    //     return () => {
    //         contract.off("CreateCharacter", onCharacterMint)
    //     }
    // }, [])

    const onCharacterMint = (sender, characterIndex) => {
        if (currentAccount === sender.toLowerCase()) {
            dispatch(setIfuserHasNft(true))
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