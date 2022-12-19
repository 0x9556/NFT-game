import { utils, constants, Contract } from 'ethers'

const { isAddress } = utils
const { AddressZero } = constants



function getSigner(provider, account) {
    return provider.getSigner(account).connectUnchecked()
}

function getProviderOrSigner(provider, account) {
    return account ? getSigner(provider, account) : provider
}

export function getContract(address, ABI, provider, account) {
    if (!isAddress(address) || address === AddressZero)
    throw Error(`Invalid 'address' parameter '${address}'.`)
    return new Contract(address, ABI, getProviderOrSigner(provider, account))
}

// function getSigner(provider, account) {
    //     return signer = provider.getSigner(account).connectUnchecked()
    // }
    
    // function getProviderOrSigner(provider, account) {
    //     return account ? getSigner(provider, account) : provider
    // }