import { BigNumber, Signer } from "ethers"
import { Config } from "../../App"
import { useEffect, useState } from "react"
import { formatEth } from "../../Utils/Utils"
import ProgressIndicator from "../ProgressIndicator"

type State = "Donating Complete" | "Donation Error" | "Donating"

export function DonateSheet(props: {
    menonic: Signer, 
    config: Config,
}) {
    let [err, setErr] = useState<string>()
    let [txId, setTxId] = useState("")
    let [state, setState] = useState<State>()
    let [eth, setEth] = useState<BigNumber>()
    let [percent, setPercent] = useState(5)
    
    function getBalance() {
        props.menonic.getAddress().then(address => {
            props.menonic.provider!.getBalance(address).then(setEth)
        })
    }

    useEffect(() => {
        console.log(props.menonic)
        getBalance()
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
            let t = await props.menonic.sendTransaction(tx)
            let r = await t.wait()
            setTxId(t.hash)
            setState("Donating Complete")
            document.getElementById("root")?.dispatchEvent(new CustomEvent("EthereumAmountUpdated"))
        } catch (err) {
            console.log(err)
            setState("Donation Error")
        }
    }
    
    if(err) {
        return <p>{err}</p>
    }

    if(!eth) {
        return <ProgressIndicator text="Loading..." />
    }

    if(!state) {
        return <div style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "column", backgroundColor: "white", padding: "5rem", borderRadius: ".5rem"}}>
            <p style={{margin: 0, padding: 0}}>{formatEth(eth?.mul(percent).div(100) ?? BigNumber.from(0))} Eth</p>
            <input style={{height: "5vh"}}  type="range" min={0} max={100} value={percent} onChange={(e) => setPercent(parseInt(e.target.value))} />
            <button onClick={donate} style={{backgroundColor: "#646cff"}}>Donate</button>
        </div>
    </div>
    } else {
        if(state == 'Donating') {
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <ProgressIndicator text="Processing Your Donation" />
            </div>
        } else if (state == "Donating Complete") {
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p>Thank you for your donation: </p>
                    <p style={{fontSize: ".5rem"}}>{txId}</p>
                </div>
            </div>
        } else {
            return <div style={{display: "grid", height: "100%", placeContent: "center"}}>
                <p>Error Donating, please try again</p>
            </div>
        }
    }
}
