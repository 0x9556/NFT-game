import { configureStore, createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: "ntf-game-info",
    initialState: {
        currentAccount: null,
        ifUserHasNft: false,
        currentBoss: undefined,
        currentCharacterIndex: undefined,
        defaultCharacters: undefined,
        userCharacterIndices: undefined,
    },
    reducers: {
        setCurrentAccount: (state, action) => {
            state.currentAccount = action.payload
        },
        setIfuserHasNft: (state, action) => {
            state.ifUserHasNft = action.payload
        },
        setDefaultCharacters: (state, action) => {
            state.defaultCharacters = action.payload
        },
        setuserCharacterIndices: (state, action) => {
            state.userCharacterIndices = action.payload
        },
        setCurrentBoss: (state, action) => {
            state.currentBoss = action.payload
        },
        setCurrentCharacterIndex: (state, action) => {
            state.currentCharacterIndex = action.payload
        }
    }
})
export const store = configureStore({
    reducer: slice.reducer
})

export const {
    setCurrentAccount,
    setIfuserHasNft,
    setDefaultCharacters,
    setuserCharacterIndices,
    setCurrentBoss,
    setCurrentCharacterIndex
} = slice.actions