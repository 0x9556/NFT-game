import React, { memo, useState } from 'react'
import { useContract } from '../../hooks/useContract'
import { ProfileWrapper } from './style'
const Profile = memo(({ info }) => {

    const contract = useContract()
    const [mintingCharacter, setMintingCharacter] = useState(false)

    const mintCharacterNFT = async (index) => {
        try {
            setMintingCharacter(true)
            let tx = await contract.createCharacter(index)
            await tx.wait()
            setMintingCharacter(false)
        } catch (error) {
            console.warn(error)
            setMintingCharacter(false)
        }
    }

    return (
        <ProfileWrapper>
            <div className="character-item" >
                <div className="name-container">
                    <p>{info.name}</p>
                </div>
                <img src={info.imgURI} alt={info.name} />
                {
                    <button
                        type="button"
                        className="character-mint-button"
                        onClick={() => mintCharacterNFT(info.characterIndex)}
                    >{`Mint ${info.name}`}</button>
                }
            </div>
        </ProfileWrapper>
    )
})

export default Profile