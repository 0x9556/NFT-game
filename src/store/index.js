import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { formatCharacterData } from '../utils/formatCharacterData'
import { getContract } from '../utils/getContract'



export const checkIfWalletConnectAction = createAsyncThunk(
    "CheckIfWalletConnec",
    async () => {
        const { ethereum } = window
        if (!ethereum) {
            console.log("Go get metamask")
            return ""
        }
        const accounts = await ethereum.request({
            method: "eth_accounts"
        })
        if (accounts.length !== 0)
            return accounts[0]
    }
)

export const connectWalletAction = createAsyncThunk(
    "ConnectWallet",
    async () => {
        const { ethereum } = window
        if (!ethereum) {
            console.log("Go get metamask")
            return ""
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        })
        if (accounts.length !== 0)
            return accounts[0]
    }
)

export const fetchCharactersAction = createAsyncThunk(
    "FetchCharacterData",
    async (params, thunkAbi) => {
        const state = thunkAbi.getState()
        const dispatch = thunkAbi.dispatch
        console.log('Checking for Character NFT on address:', state.account)
        const contract = getContract()
        const ifUserHasNft = await contract.checkIfUserHasNft()
        if (!ifUserHasNft) {
            console.log('No character NFT found')
            const charactersMeta = await contract.getAllDefaultCharacters()
            const defaultCharacterData = charactersMeta.map(item => formatCharacterData(item))
            console.log(defaultCharacterData)
            dispatch(setDefaultCharacters(defaultCharacterData))
        } else {
            console.log('User has character NFT')
            const characterIndexes = await contract.getcharacters()
            console.log(characterIndexes)
            const charactersMeta = characterIndexes.map(item =>
                contract.nftAttributes(item).then(res => res))
            const characterData = charactersMeta.map(item => formatCharacterData(item))
            dispatch(setCharacters(characterData))
        }
    }
)



const slice = createSlice({
    name: "ntf-game-info",
    initialState: {
        account: "",
        contract: {},
        characters: [],
        defaultCharacters: []
    },
    reducers: {
        setDefaultCharacters: (state, action) => {
            state.defaultCharacters = action.payload
        },
        setCharacters: (state, action) => {
            state.characters.push(action.payload)
        }
    },
    extraReducers: builder => {
        // builder.addCase(getContractAction.fulfilled, (state, action) => {
        //     state.contract = action.payload
        // })
        builder.addCase(checkIfWalletConnectAction.fulfilled, (state, action) => {
            state.account = action.payload
        })
        builder.addCase(connectWalletAction.fulfilled, (state, action) => {
            state.account = action.payload
        })
    }

})
export const store = configureStore({
    reducer: slice.reducer
})

export const { setDefaultCharacters, setCharacters } = slice.actions