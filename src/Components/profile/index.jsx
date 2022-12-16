import React, { memo } from 'react'
import { ProfileWrapper } from './style'
const Profile = memo(({ info }) => {
    return (
        <ProfileWrapper>
            <p>{info.name}</p>
            <p>{info.hp}</p>
            <p>{info.maxHp}</p>
            <p>{info.attackDamage}</p>
        </ProfileWrapper>
    )
})

export default Profile