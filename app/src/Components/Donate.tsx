import { Signer } from "ethers"
import { useEffect, useState } from "react"

function DonateSheet(props: {signer: Signer}) {
    let [eth, setEth] = useState(0)
    
    useEffect(() => {
        props.signer.getAddress().then(address => {
            props.signer.provider!.getBalance(address).then(bn => setEth(bn.toNumber()))
        })
    }, [])
    
    return <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
            <p style={{margin: 0, padding: 0}}>{eth} Eth</p>
            <input type="range" min={0} max={100} value={eth} onChange={(e) => setEth(parseInt(e.target.value))} />
            <button style={{backgroundColor: "#646cff"}}>Donate</button>
        </div>
    </div>
}

export default function Donate(props: {signer: Signer}) {
    function showActionSheet() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <DonateSheet signer={props.signer} />
        }))
    }
    
    return <button onClick={showActionSheet}>
        <p>Please consider donating</p>
    </button>
}