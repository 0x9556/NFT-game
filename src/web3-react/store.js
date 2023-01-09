import { createStore } from 'zustand'
import { getAddress } from '@ethersproject/address'

const MAX_SAFE_CHAIN_ID = 4503599627370476

function validateChainId(chainId) {
    if (chainId <= 0 || chainId > MAX_SAFE_CHAIN_ID || !Number.isInteger(chainId))
        throw new Error(`Invalid chainId ${chainId}`)
}

function validateAccount(account) {
    return getAddress(account)
}

const DEFAULT_STATE = {
    chainId: undefined,
    accounts: undefined,
    activating: false
}


export function createWeb3ReactStoreAndActions() {
    const store = createStore(() => DEFAULT_STATE)

    function startActivation() {
        store.setState({ ...DEFAULT_STATE, activating: true })
        return () => {
            store.setState({ activating: false })
        }
    }

    function update(stateUpdate) {
        if (stateUpdate.chainId !== undefined)
            validateChainId(stateUpdate.chainId)

        if (stateUpdate.accounts !== undefined) {
            for (account of stateUpdate.accounts) {
                validateAccount(account)
            }
        }

        store.setState(existingState => {
            const chainId = stateUpdate.chainId ?? existingState.chainId
            const accounts = stateUpdate.accounts ?? existingState.accounts

            let activating = existingState.activating
            if (activating && chainId && accounts)
                activating = false 

            return { chainId, accounts, activating }
        })
    }

    function resetState() {
        store.setState(DEFAULT_STATE)
    }

    return [store, { startActivation, update, resetState }]
}