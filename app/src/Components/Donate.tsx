import { BigNumber, Signer } from "ethers"
import { useEffect, useState } from "react"
import { Config } from "../App"
import { formatEth } from "../Utils/Utils"

function DonateSheet(props: {signer: Signer, 
    config: Config,
}) {
    type State = "Donating Complete" | "Donation Error" | "Donating"
    let [state, setState] = useState<State>()
    let [eth, setEth] = useState<BigNumber>()
    let [percent, setPercent] = useState(5)
    
    useEffect(() => {
        props.signer.getAddress().then(address => {
            props.signer.provider!.getBalance(address).then(bn => setEth(bn))
        })
    }, [])

    async function donate() {
        if(eth?.eq(0) || percent == 0) {
            return
        }
        
        let tx = {
            to: props.config.donationAddress,
            value: eth?.mul(percent).div(100)
        }
        try {
            setState("Donating")
            let resp = await props.signer.sendTransaction(tx)
            await resp.wait()
            setState("Donating Complete")
        } catch (err) {
            console.log(err)
            setState("Donation Error")
        }
    }
    
    if(!state) {
        return <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
            <p style={{margin: 0, padding: 0}}>{formatEth(eth?.mul(percent).div(100) ?? BigNumber.from(0))} Eth</p>
            <input type="range" min={0} max={100} value={percent} onChange={(e) => setPercent(parseInt(e.target.value))} />
            <button onClick={donate} style={{backgroundColor: "#646cff"}}>Donate</button>
        </div>
    </div>
    } else {
        if(state == 'Donating') {
            return <p>Donating....</p> 
        } else if (state == "Donating Complete") {
            return <p>Thanks for your donation</p>
        } else {
            return <p>Error Donating</p>
        }
    }
}

export default function Donate(props: {signer: Signer, config: Config}) {    
    function showActionSheet() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <DonateSheet 
            config={props.config}
            signer={props.signer} />
        }))
    }
    
    return <button onClick={showActionSheet}>
        <p>Please consider donating</p>
    </button>
}