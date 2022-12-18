import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setCurrentBoss, setCurrentCharacterIndex } from '../../store'
import { useContract } from '../../hooks/useContract'
import { formateBossData, formatCharacterData } from '../../utils/formatCharacterData'
import { ArenaWrapper } from './style'
import LoadingIndicator from '../loadingIndicator'


const Arena = memo(() => {

  const contract = useContract()
  const dispatch = useDispatch()
  const [attackState, setAttackState] = useState("fulfilled")
  const currentCharacterIndex = useSelector(state => state.currentCharacterIndex)
  const currentAccount = useSelector(state => state.currentAccount)
  const userCharacters = useSelector(state => state.userCharacters, shallowEqual)
  const currentBoss = useSelector(state => state.currentBoss, shallowEqual)
  // const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    const fetchBoss = async () => {
      const currentBossMeta = await contract.getCurrentBoss()
      const currentBoss = formateBossData(currentBossMeta)
      dispatch(setCurrentBoss(currentBoss))
    }
    fetchBoss()
  }, [attackState])

  useEffect(() => {
    contract.on("AttackComplete", onAttackComplete)
    return () => {
      contract.off("AttackComplete", onAttackComplete)
    }
  }, [])

  const attack = async () => {
    try {
      if (currentCharacterIndex) {
        setAttackState("pending")
        let tx = await contract.attackBoss(currentCharacterIndex)
        await tx.wait()
        setAttackState("fulfilled")
      } else {
        alert("please select a character")
      }
    } catch (error) {
      setAttackState("rejected")
      console.warn(error)
    }

  }

  const onAttackComplete = (from, characterIndex, newcharacterHp, bossIndex, newbossHp) => {
    const bossHp = newbossHp.toNumber();
    const playerHp = newcharacterHp.toNumber();
    const sender = from.toString();

    if (currentAccount === sender.toLowerCase()) {
      setAttackState("edle")
      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`)
    }
  }

  return (
    userCharacters &&
    <ArenaWrapper>
      <div className="arena-container">
        {/* {currentBoss && userCharacters && (
          <div id="toast" className={showToast ? 'show' : ''}>
            <div id="desc">{`💥 ${currentBoss.name} was hit for ${null}!`}</div>
          </div>
        )} */}
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
            {attackState === 'pending' && (
              <div className="loading-indicator">
                <LoadingIndicator />
                <p>Attacking ⚔️</p>
              </div>
            )}
          </div>
        )}

        {
          userCharacters.map(characterTokenId =>
            <SelectCharacter
              characterTokenId={characterTokenId}
              attackState={attackState}
              key={characterTokenId} />
          )
        }

      </div>
    </ArenaWrapper>
  )
})

const SelectCharacter = memo(({ characterTokenId ,attackState}) => {

  const contract = useContract()
  const dispatch = useDispatch()
  const [characterAttibutes, setCharacterAttibutes] = useState(undefined)
  useEffect(() => {
    const fetchCharacterAttributes = async () => {
      const characterAttibutes = await contract.nftAttributes(characterTokenId)
      setCharacterAttibutes(formatCharacterData(characterAttibutes))
    }
    fetchCharacterAttributes()
  }, [attackState])

  return (
    characterAttibutes &&
    <div className="players-container">
      <div className="player-container">
        <h2>Your Character</h2>
        <div className="player">
          <div className="image-content">
            <h2>{characterAttibutes.name}</h2>
            <img
              src={characterAttibutes.imgURI}
              alt={`Character ${characterAttibutes.name}`}
              onClick={() => { dispatch(setCurrentCharacterIndex(characterTokenId)) }}
            />
            <div className="health-bar">
              <progress value={characterAttibutes.hp} max={characterAttibutes.maxHp} />
              <p>{`${characterAttibutes.hp} / ${characterAttibutes.maxHp} HP`}</p>
            </div>
          </div>
          <div className="stats">
            <h4>{`⚔️ Attack Damage: ${characterAttibutes.attackDamage}`}</h4>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Arena