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
exports.ConnectMetamask = void 0;
const ethers_1 = require("ethers");
function ConnectMetamask(props) {
    let enabled = window.ethereum != undefined;
    function connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield window.ethereum.request({ method: "eth_requestAccounts" });
            let provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
            props.onConnect(provider.getSigner());
        });
    }
    return <div className="connectMetamask">
        <button onClick={connect} disabled={!enabled}>
            {enabled ? "Please Connect MetaMask" : "Please install metamask"}
        </button>
    </div>;
}
exports.ConnectMetamask = ConnectMetamask;
