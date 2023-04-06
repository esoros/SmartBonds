import { Signer } from "ethers"
import { Config } from "../App"
import { DonateSheet } from "./Sheets/DonationSheet"

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