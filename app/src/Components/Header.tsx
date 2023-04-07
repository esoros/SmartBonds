import { createRef, useEffect, useState } from "react"
import "../App.css"
import { BigNumber, Signer } from "ethers"
import { formatEth } from "../Utils/Utils"

export type Layout = "Home" | "Collection" | "Auction" | "Donate" | "Admin"

export default function Header(props: {
    onLayout: (layout: Layout) => void,
    onRenderHeight?: (height: number) => void
    signer: Signer
}) {
    let [eth, setEth] = useState<BigNumber>()
    let [address, setAddress] = useState("")
    let [renderHeight, setRenderHeight] = useState<number>()
    let distRef = createRef<HTMLDivElement>()

    function getWalletBalance() {
        props.signer.getAddress().then(address => {
            setAddress(address)
            props.signer.provider!.getBalance(address).then(bn => setEth(bn))
        })
    }

    function ethUpdated() {
        getWalletBalance()
    }

    useEffect(() => {
        getWalletBalance()
        document.getElementById("root")?.addEventListener("EthereumAmountUpdated", ethUpdated)
        return () => document.getElementById("root")?.removeEventListener("EthereumAmountUpdated", ethUpdated)
    }, [])

    useEffect(() => {
        if(distRef.current) {
            setRenderHeight(distRef.current.scrollHeight)
        }
    }, [distRef])

    useEffect(() => {
        if(renderHeight && props.onRenderHeight) {
            props.onRenderHeight(renderHeight)
        }
    }, [renderHeight])

    return <div ref={distRef} className="header" style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center"}}>
        <h2 style={{cursor: "default", textDecoration: "underline", textAlign: "center", marginRight: "1rem"}}>smartbonds.art</h2>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Home")}>Home</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Auction")}>Auction</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Collection")}>Wallet</button>
        {
            address == "0x7880aA5B5c9C8d30719Db0747DA60875B9115E19" ? 
            <button style={{height: "7vh"}} onClick={() => props.onLayout("Admin")}>Admin</button> : 
            <></>
        }
        <div style={{flexGrow: 1}} />
        <button style={{height: "7vh"}}>{formatEth(eth ?? BigNumber.from(0))} Eth</button>
        <button onClick={() => props.onLayout("Donate")} style={{height: "7vh"}}>😃 Donate</button>
    </div>
}