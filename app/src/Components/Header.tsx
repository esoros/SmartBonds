export type Layout = "Home" | "Collection" | "Auction" | "Donate"
import { useEffect, useState } from "react"
import "../App.css"
import { BigNumber, Signer } from "ethers"
import { formatEth } from "../Utils/Utils"

export default function Header(props: {
    onLayout: (layout: Layout) => void,
    signer: Signer
}) {
    let [eth, setEth] = useState<BigNumber>()
    
    useEffect(() => {
        props.signer.getAddress().then(address => {
            props.signer.provider!.getBalance(address).then(bn => setEth(bn))
        })
    }, [])

    return <div className="header" style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <div style={{width: "3%"}}></div>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Home")}>Home</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Collection")}>Collection</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Auction")}>Auction</button>
        <div style={{flexGrow: 1}} />
        <button style={{height: "7vh"}}>{formatEth(eth ?? BigNumber.from(0))} Eth</button>
        <button onClick={() => props.onLayout("Donate")} style={{height: "7vh"}}>Donate</button>
        <div style={{width: "3%"}}></div>
    </div>
}