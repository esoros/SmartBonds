import {ethers, Signer} from "ethers"

export function ConnectMetamask(props: {
    onConnect: (ethereum: Signer) => void
}) {
    let enabled = (window as any).ethereum != undefined
    
    async function connect() {
        await (window as any).ethereum.request({method: "eth_requestAccounts"})
        let provider = new ethers.providers.Web3Provider((window as any).ethereum)
        props.onConnect(provider.getSigner())
    }
    
    return <div className="connectMetamask">
        <button onClick={connect} disabled={!enabled}>
            {
                enabled ? "Please Connect Metamask" : "Please install metamask"
            }
        </button>
    </div>
}