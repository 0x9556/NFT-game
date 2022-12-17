import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useDefaultCharacters } from '../../hooks/useCharacters'
import { fetchCharactersAction } from '../../store'
import { SelectCharacterWarapper } from './style'
import Profile from '../profile'

const SelectCharacter = () => {


    const account = useSelector(state => state.account)
    const dispatch = useDispatch()
    const defaultCharacters = useDefaultCharacters()

    useEffect(() => {
        checkNetwork()
        dispatch(fetchCharactersAction())
    }, [account])

    // useEffect(() => {
    //     const contract = getContract()
    //     contract.on("CreateCharacter", onCharacterMint)
    //     return () => {
    //         contract.off("CreateCharacter", onCharacterMint)
    //     }
    // }, [])

    const checkNetwork = () => {
        if (window.ethereum.networkVersion !== "31337")
            console.log("please connect to test network")
    }

    // const onCharacterMint = (sender, characterIndex) => {
    //     console.log(
    //         `CharacterNFTMinted - sender: ${sender}  characterIndex: ${characterIndex.toNumber()}`
    //     )
    // }

    const renderDefaultCharacters = () => {
        if (defaultCharacters.length !== 0) {
            defaultCharacters.map((item, index) =>
                <Profile info={item} key={index} />)
        }
    }

    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
                <div className="character-grid">
                    {renderDefaultCharacters()}
                </div>

            </div>
        </SelectCharacterWarapper>
    )
}

export default SelectCharacter