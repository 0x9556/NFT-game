import create, { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'
const initialState = {
    ifUserHasNft: false,
    currentBoss: undefined,
    currentCharacterIndex: undefined,
    defaultCharacters: undefined,
    userCharacterIndices: undefined,
}

const store = createStore(set => ({
    initialState,
    setIfuserHasNft: payload => {
        set({ ifUserHasNft: payload })
    },
    setuserCharacterIndices: payload => {
        set({ currentCharacterIndex: payload })
    },
    setCurrentBoss: payload => {
        set({ currentBoss: payload })
    },
    setCurrentCharacterIndex: payload => {
        set({ currentCharacterIndex: payload })
    }

}))

export const useStore = create(store)
