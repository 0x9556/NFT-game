import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getContract } from '../utils/getContract'
import { formatCharacterData } from '../utils/formatCharacterData'
export const checkIfWalletConnectAction = createAsyncThunk(
    "CheckIfWalletConnec",
    async () => {
        const { ethereum } = window
        if (!ethereum) {
            console.log("Go get metamask")
            return
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
            return
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
        const dispatch = thunkAbi.dispatch
        const contract = await getContract()
        const ifUserHasNft = await contract.checkIfUserHasNft()
        if (!ifUserHasNft) {
            const charactersMeta = await contract.getAllDefaultCharacters()
            const defaultCharacterData = charactersMeta.map(item => formatCharacterData(item))
            console.log(defaultCharacterData)
            dispatch(setDefaultCharacters(defaultCharacterData))
        } else {
            const characterIndexes = await contract.getcharacters()
            console.log(characterIndexes)
            const charactersMeta = characterIndexes.map(item =>
                contract.nftAttributes(item).then(res => res))
            const characterData = charactersMeta.map(item => formatCharacterData(item))
            console.log(characterData)
            dispatch(setCharacters(characterData))
        }
    }
)

const slice = createSlice({
    name: "ntf-game-info",
    initialState: {
        account: "",
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

export const {setDefaultCharacters,setCharacters} = slice.actions