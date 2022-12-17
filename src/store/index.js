import { configureStore, createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: "ntf-game-info",
    initialState: {
        currentAccount: null,
        ifUserHasNft: false,
        defaultCharacters: [],
        userCharacters: [],
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
        setuserCharacters: (state, action) => {
            state.userCharacters = action.payload
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
    setuserCharacters
} = slice.actions