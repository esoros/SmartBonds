import { Signer } from "ethers"
import { Config } from "../App"
import { DonateSheet } from "./Sheets/DonationSheet"
import { useEffect, useState } from "react"

export default function Donate(props: {mnemonic: string, config: Config, renderHeight: number}) {    
    const [renderHeight, setRenderHeight] = useState<number>(props.renderHeight)
    
    useEffect(() => {
        setRenderHeight(props.renderHeight)
    }, [props.renderHeight])

    function showActionSheet() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <DonateSheet 
            config={props.config}
            menonic={props.mnemonic} />
        }))
    }
    
    return <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <div style={{flexGrow: 1}} />
        <button onClick={showActionSheet} style={{marginBottom: renderHeight + "px"}}>
            <p>Please Consider Donating</p>
        </button>
        <div style={{flexGrow: 1}} />
    </div>
}