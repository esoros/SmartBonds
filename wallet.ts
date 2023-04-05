import { Wallet } from "ethers"

export function generateWallet() {
    let wallet = Wallet.createRandom()
    console.log({
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase
    })
}

generateWallet()