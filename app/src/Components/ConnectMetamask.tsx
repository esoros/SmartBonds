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
    
    return <div style={{height: "100%", width: "100%", display: "grid", placeContent: "center"}}>
        <button onClick={connect} style={{borderRadius: ".5rem", height: "20rem", width: "20rem"}} disabled={!enabled}>
            {
                enabled ? "Please Connect MetaMask" : "Please install metamask"
            }
        </button>
    </div>
}