import {providers, Signer, Wallet} from "ethers"
import { useEffect, useState } from "react"

let networkUrl = "https://rpc.testnet.fantom.network/"

export function ConnectMetamask(props: {
    onConnect: (mnemonic: Signer) => void
}) {
    let [width, setWidth] = useState(0)
    let [input, setInput] = useState<string>()
    let [err, setErr] = useState<string>()

    async function connect() {
        if(!input) {return}
        try {
            let wallet = Wallet.fromMnemonic(input)
            localStorage.setItem("mnemonic", input)
            wallet = wallet.connect(new providers.JsonRpcProvider(networkUrl))
            props.onConnect(wallet)
        } catch (e : any) {
            setErr(e.message)
        }
    }

    function setw() {
        setWidth(document.getElementById("connectButton")?.scrollWidth ?? 0)
    }

    useEffect(() => {
        let mnemonic = localStorage.getItem("mnemonic")
        if(mnemonic) {
            let wallet = Wallet.fromMnemonic(mnemonic)
            wallet = wallet.connect(new providers.JsonRpcProvider(networkUrl))
            props.onConnect(wallet)
        }
        
        setWidth(document.getElementById("connectButton")?.scrollWidth ?? 0)
        window.addEventListener('resize', setw)
        return () => window.removeEventListener('resize', setw)
    },[])
    
    return <div className="connectMetamask" style={{height: "100%", width: "100%", gap: ".25rem"}}>
        {err ? <p>invalid mnemonic</p> : <></>}
        <h2 style={{padding: 0, margin: 0}}>smartbonds.ai</h2>
        <textarea placeholder="please enter your mnemonic" style={{height: "10vh", width: (width - 10) + "px"}} value={input} onChange={(e) => setInput(e.target.value)} />
        <button id="connectButton" style={{height: "10vh"}} onClick={(connect)}>Connect</button>
    </div>
}