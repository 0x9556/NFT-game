import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

function onError(error) {
    console.debug(`web3-react error: ${error}`)
}

const [web3Injected, web3InjectedHooks] = initializeConnector(actions => new MetaMask({ actions, onError }))

export const injectedConnection = {
    connector: web3Injected,
    hooks: web3InjectedHooks,
    type: 'INJECTED'
}