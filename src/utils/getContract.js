import { ethers } from 'ethers'
import { CONRACT_ADDRESS, ABI } from './constants'

export function getContract(address,contractAbi,signer) {
    const contractAddress = CONRACT_ADDRESS
    const contractAbi = ABI
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(contractAddress, contractAbi, signer)
}