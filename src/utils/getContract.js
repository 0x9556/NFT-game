import { ethers } from 'ethers'
import { ABI, CONRACT_ADDRESS } from './constants'

export async function getContract() {
    const contractAddress = CONRACT_ADDRESS
    const contractAbi = ABI
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractAbi, signer)
}