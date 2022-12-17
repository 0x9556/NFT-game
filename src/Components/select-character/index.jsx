import React, { useEffect, memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setDefaultCharacters, setuserCharacters, setIfuserHasNft } from '../../store'
import { formatCharacterData } from '../../utils/formatCharacterData'
import { useContract } from '../../hooks/useContract'
import { SelectCharacterWarapper } from './style'
import Profile from '../profile'


const SelectCharacter = () => {

    const contract = useContract()
    const dispatch = useDispatch()
    const ifUserHasNft = useSelector(state => state.ifUserHasNft)
    const currentAccount = useSelector(state => state.currentAccount)
    const defaultCharacters = useSelector(state => state.defaultCharacters, shallowEqual)
    const userCharacters = useSelector(state => state.userCharacters, shallowEqual)

    useEffect(() => {
        const networkVersion = window.ethereum.networkVersion
        if (networkVersion !== "31337")
            console.log("please connect to local network")
    }, [])

    useEffect(() => {
        const getDefaultCharacters = async () => {
            const defaultCharactersMeta = await contract.getAllDefaultCharacters()
            dispatch(setDefaultCharacters(defaultCharactersMeta.map(item => formatCharacterData(item))))
        }
        getDefaultCharacters()
    }, [])

    useEffect(() => {
        const getUserCharacters = async () => {
            const indices =await contract.getCharacters()
            console.log(indices)
            const charactersMeta = indices.map(async (index) => {
                return await contract.nftAttributes(index)
            })
            console.log(charactersMeta)
            dispatch(setuserCharacters(charactersMeta.map(item => formatCharacterData(item))))
        }
        getUserCharacters()
    }, [currentAccount, ifUserHasNft])


    useEffect(() => {
        contract.on("CreateCharacter", onCharacterMint)
        return () => {
            contract.off("CreateCharacter", onCharacterMint)
        }
    }, [])


    const onCharacterMint = (sender, characterIndex) => {
        console.log(
            `CharacterNFTMinted - sender: ${sender}  characterIndex: ${characterIndex.toNumber()}`
        )
        if (currentAccount === sender)
            dispatch(setIfuserHasNft(true))
    }


    const renderDefaultCharacters = () => {
        if (!ifUserHasNft) {
            return defaultCharacters.map((item, index) =>
                <Profile info={item} key={index} />)
        }
    }

    const renderUserCharacters = () => {
        userCharacters.map((item, index) =>
            <Profile info={item} key={index} />)
    }



    return (
        <SelectCharacterWarapper>
            <div className="select-character-container">
                <h2>Mint Your Hero. Choose wisely.</h2>
                <div className="character-grid">
                    {
                        ifUserHasNft ?
                            renderUserCharacters() :
                            renderDefaultCharacters()
                    }
                </div>

            </div>
        </SelectCharacterWarapper>
    )
}


export default memo(SelectCharacter)