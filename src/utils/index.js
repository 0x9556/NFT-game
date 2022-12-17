import ethers from 'ethers'


// function getSigner(provider, account) {
//     return signer = provider.getSigner(account).connectUnchecked()
// }

// function getProviderOrSigner(provider, account) {
//     return account ? getSigner(provider, account) : provider
// }

function getProviderOrSigner(provider, signer) {
    return signer ? signer : provider
}

export function getContract(address, ABI, provider, signer) {
    return new ethers.Contract(address, ABI, getProviderOrSigner(provider, signer))
}