import { BigNumber, Signer } from "ethers"
import { Config } from "../../App"
import { useEffect, useState } from "react"
import { formatEth } from "../../Utils/Utils"

type State = "Donating Complete" | "Donation Error" | "Donating"

export function DonateSheet(props: {signer: Signer, 
    config: Config,
}) {
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
            document.getElementById("root")?.dispatchEvent(new CustomEvent("EthereumAmountUpdated"))
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
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <p>Donating....</p> 
            </div>
        } else if (state == "Donating Complete") {
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <p>Thanks for your donation</p>
            </div>
        } else {
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <p>Error Donating, please try again</p>
            </div>
        }
    }
}
