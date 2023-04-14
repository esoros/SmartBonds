import {Wallet, providers, ContractFactory} from "ethers"
import { readFile, writeFile } from "fs/promises"

export async function deploy() {
    let wallet = Wallet.fromMnemonic("solid vicious know combine spin fuel risk tilt van pass heavy require")
    wallet = wallet.connect(new providers.JsonRpcProvider("https://rpc.ankr.com/fantom_testnet/"))

    console.log("deploying contract from: ", {
        walletBalance: await wallet.provider.getBalance(await wallet.getAddress()),
        walletAddress: wallet.address
    })

    let abi = await readFile("SmartBonds_sol_SmartBonds.abi").then(buf => buf.toString())
    let bin = await readFile("SmartBonds_sol_SmartBonds.bin").then(buf => buf.toString())   
    let factory = new ContractFactory(abi, bin, wallet)
    let contract = await factory.deploy("")
    contract = await contract.deployed()
    
    console.log("contract deployed at: ", {
        walletBalance: await wallet.provider.getBalance(await wallet.getAddress()),
        contractAddress: contract.address
    })

    let appConfig = {
        address: contract.address,
        abi: abi
    }
    await writeFile("../app/public/config.json", JSON.stringify(appConfig))
    console.log("app config written")
}

deploy()