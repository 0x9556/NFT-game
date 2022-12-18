import React, { useEffect, memo, useState } from 'react'
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
            const indices = await contract.getCharacters()
            // const charactersMeta = await Promise.allSettled(
            //     indices.map(async (index) =>
            //         await contract.nftAttributes(index)
            //     )
            // )
            // dispatch(setuserCharacters(charactersMeta.map(item => formatCharacterData(item.value))))
            dispatch(setuserCharacters(indices.map(index => index.toNumber())))
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