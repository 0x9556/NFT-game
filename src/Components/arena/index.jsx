import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setCurrentBoss, setCurrentCharacterIndex } from '../../store'
import { useContract } from '../../hooks/useContract'
import { formateBossData } from '../../utils/formatCharacterData'
import { ArenaWrapper } from './style'

const Arena = memo(() => {

  const contract = useContract()
  const dispatch = useDispatch()
  const currentCharacterIndex = useSelector(state => state.currentCharacterIndex)
  const userCharacters = useSelector(state => state.userCharacters, shallowEqual)
  const currentBoss = useSelector(state => state.currentBoss, shallowEqual)
  useEffect(() => {
    const fetchBoss = async () => {
      const currentBossMeta = await contract.getCurrentBoss()
      const currentBoss = formateBossData(currentBossMeta)
      dispatch(setCurrentBoss(currentBoss))
    }
    fetchBoss()
  }, [contract])

  useEffect(() => {
    contract.on("AttackComplete", onAttackComplete)
    return () => {
      contract.off("AttackComplete", onAttackComplete)
    }
  }, [])

  const attack = async () => {
    let tx = await contract.attackBoss(currentCharacterIndex)
    await tx.wait()
  }

  const onAttackComplete = (addr, characterIndex, characterHp, bossIndex, bossHp) => {
    console.log(addr, characterIndex, characterHp, characterIndex, bossIndex, bossHp)
  }

  return (

    userCharacters &&
    <ArenaWrapper>
      <div className="arena-container">
        {currentBoss && (
          <div className="boss-container">
            <div className={`boss-content`}>
              <h2>🔥 {currentBoss.name} 🔥</h2>
              <div className="image-content">
                <img src={currentBoss.imgURI} alt={`Boss ${currentBoss.name}`} />
                <div className="health-bar">
                  <progress value={currentBoss.hp} max={currentBoss.maxHp} />
                  <p>{`${currentBoss.hp} / ${currentBoss.maxHp} HP`}</p>
                </div>
              </div>
            </div>
            <div className="attack-container">
              <button className="cta-button" onClick={attack}>
                {`💥 Attack ${currentBoss.name}`}
              </button>
            </div>
          </div>
        )}

        {
          userCharacters.map((character, index) =>
            <SelectCharacter userCharacter={character} index={index} key={index} />
          )
        }

      </div>
    </ArenaWrapper>
  )
})

const SelectCharacter = memo(({ userCharacter, index }) => {
  const dispatch = useDispatch()
  return (
    <div className="players-container">
      <div className="player-container">
        <h2>Your Character</h2>
        <div className="player">
          <div className="image-content">
            <h2>{userCharacter.name}</h2>
            <img
              src={userCharacter.imgURI}
              alt={`Character ${userCharacter.name}`}
              onClick={() => { dispatch(setCurrentCharacterIndex(index)) }}
            />
            <div className="health-bar">
              <progress value={userCharacter.hp} max={userCharacter.maxHp} />
              <p>{`${userCharacter.hp} / ${userCharacter.maxHp} HP`}</p>
            </div>
          </div>
          <div className="stats">
            <h4>{`⚔️ Attack Damage: ${userCharacter.attackDamage}`}</h4>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Arena