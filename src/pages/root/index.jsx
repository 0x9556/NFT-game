import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { checkIfWalletConnectAction } from '../../store'
import { RootWrapper } from './style'
import ConnectWallet from '../../Components/connect-wallet'
import SelectCharacter from '../../Components/select-character'
export default function Root() {

  const account = useSelector(state => state.account)
  const characters = useSelector(state => state.characters, shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkIfWalletConnectAction())
  }, [dispatch])


  const renderContent = () => {
    if (!account)
      return <ConnectWallet />

    if (account && !characters.length)
      return <SelectCharacter />
  }


  return (
    <RootWrapper>
      <div className="App">
        <div className="container">
          <div className="header-container">
            <p className="header gradient-text">⚔️Metaverse Slayer ⚔️</p>
            <p className="sub-text">Team up to protect the Metaverse!</p>
            {renderContent()}
          </div>
        </div>
      </div>
    </RootWrapper>
  )
}
