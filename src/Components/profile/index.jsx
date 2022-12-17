import React, { memo } from 'react'
import { getContract } from '../../utils/getContract'
import { ProfileWrapper } from './style'
const Profile = memo(({ info }) => {


    const mintCharacterNFTAction = async (index) => {
        const contract = getContract()
        let tx = await contract.createCharacter(index)
        await tx.wait()
    }
    

    return (
        <ProfileWrapper>
            <div className="character-item" >
                <div className="name-container">
                    <p>{info.name}</p>
                </div>
                <img src={info.imgURI} alt={info.name} />
                <button
                    type="button"
                    className="character-mint-button"
                    onClick={()=>{mintCharacterNFTAction(info.characterIndex)}}
                >{`Mint ${info.name}`}</button>
            </div>
        </ProfileWrapper>
    )
})

export default Profile