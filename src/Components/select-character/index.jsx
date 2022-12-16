import React, { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { fetchCharactersAction } from '../../store'
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

    const checkNetwork = () => {
        if (window.ethereum.networkVersion !== "31337")
            console.log("please connect to test network")
    }

    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
                {
                    defaultCharacters.map((item, index) =>
                        <Profile info={item} key={index} />)
                }
            </div>
        </SelectCharacterWarapper>
    )
}

export default SelectCharacter