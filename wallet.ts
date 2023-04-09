import { Wallet } from "ethers"

export function generateWallet() {
    let wallet = Wallet.createRandom()
    console.log({
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase
    })

    let mnemonic = "between mobile evoke zebra nominee private female borrow huge unlock film feed"
    wallet = Wallet.fromMnemonic(mnemonic)
    console.log(wallet.address)
}

generateWallet()