import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { fetchCharactersAction } from '../../store'
import { getContract } from '../../utils/getContract'
import Profile from '../profile'
import { SelectCharacterWarapper } from './style'

const SelectCharacter = () => {


    const account = useSelector(state => state.account)
    const defaultCharacters = useSelector(state => state.defaultCharacters, shallowEqual)
    const dispatch = useDispatch()

    useEffect(() => {
        checkNetwork()
        dispatch(fetchCharactersAction())
    }, [account])

    useEffect(() => {
        const contract = getContract()
        contract.on("CreatCharacter", onCharacterMint)
        return () => {
            contract.off("CreatCharacter", onCharacterMint)
        }
    },[])

    const checkNetwork = () => {
        if (window.ethereum.networkVersion !== "31337")
            console.log("please connect to test network")
    }

    const onCharacterMint = (sender, characterIndex) => {
        console.log(
            `CharacterNFTMinted - sender: ${sender}  characterIndex: ${characterIndex.toNumber()}`
        )
    }

    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
                <div className="character-grid">
                    {
                        defaultCharacters.map((item, index) =>
                            <Profile info={item} key={index} />)
                    }
                </div>

            </div>
        </SelectCharacterWarapper>
    )
}

export default SelectCharacter