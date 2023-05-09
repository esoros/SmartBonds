"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = void 0;
const ethers_1 = require("ethers");
const promises_1 = require("fs/promises");
function deploy() {
    return __awaiter(this, void 0, void 0, function* () {
        let wallet = ethers_1.Wallet.fromMnemonic("solid vicious know combine spin fuel risk tilt van pass heavy require");
        wallet = wallet.connect(new ethers_1.providers.JsonRpcProvider("https://rpc.ankr.com/fantom_testnet/"));
        console.log("deploying contract from: ", {
            walletBalance: yield wallet.provider.getBalance(yield wallet.getAddress()),
            walletAddress: wallet.address
        });
        let abi = yield (0, promises_1.readFile)("SmartBonds_sol_SmartBonds.abi").then(buf => buf.toString());
        let bin = yield (0, promises_1.readFile)("SmartBonds_sol_SmartBonds.bin").then(buf => buf.toString());
        let factory = new ethers_1.ContractFactory(abi, bin, wallet);
        let contract = yield factory.deploy("");
        contract = yield contract.deployed();
        console.log("contract deployed at: ", {
            walletBalance: yield wallet.provider.getBalance(yield wallet.getAddress()),
            contractAddress: contract.address
        });
        let appConfig = {
            address: contract.address,
            abi: abi
        };
        yield (0, promises_1.writeFile)("../app/public/config.json", JSON.stringify(appConfig));
        console.log("app config written");
    });
}
exports.deploy = deploy;
deploy();
