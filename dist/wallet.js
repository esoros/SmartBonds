"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWallet = void 0;
const ethers_1 = require("ethers");
function generateWallet() {
    let wallet = ethers_1.Wallet.createRandom();
    console.log({
        address: wallet.address,
        mnemonic: wallet.mnemonic.phrase
    });
    let mnemonic = "between mobile evoke zebra nominee private female borrow huge unlock film feed";
    wallet = ethers_1.Wallet.fromMnemonic(mnemonic);
    console.log(wallet.address);
}
exports.generateWallet = generateWallet;
generateWallet();
