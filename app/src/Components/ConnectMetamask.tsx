import {ethers, providers, Signer, Wallet} from "ethers"
import { useEffect, useState } from "react"

//save and load from localstorage, and then does this thing work 
//on mobile

export function ConnectMetamask(props: {
    onConnect: (mnemonic: string) => void
}) {
    let [width, setWidth] = useState(0)
    let [input, setInput] = useState<string>()
    let [err, setErr] = useState<string>()

    async function connect() {
        if(!input) {return}
        try {
            Wallet.fromMnemonic(input)
            localStorage.setItem("mnemonic", input)
            props.onConnect(input)
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
            props.onConnect(mnemonic)
        }
        
        setWidth(document.getElementById("connectButton")?.scrollWidth ?? 0)
        window.addEventListener('resize', setw)
        return () => window.removeEventListener('resize', setw)
    },[])
    
    return <div className="connectMetamask" style={{height: "100%", width: "100%"}}>
        {err ? <p>invalid mnemonic</p> : <></>}
        <h2>SmartBonds.ai</h2>
        <textarea placeholder="please enter your mnemonic" style={{height: "10vh", width: (width - 10) + "px"}} value={input} onChange={(e) => setInput(e.target.value)} />
        <button id="connectButton" style={{height: "10vh"}} onClick={(connect)}>Connect</button>
    </div>
}