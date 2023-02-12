import { Signer } from "ethers";
import { useEffect, useState } from "react";
import { Layout } from "../App";

export default function Header(props: {signer: Signer, layoutChange: (layout: Layout) => void}) {
    let [address, setAddress] = useState<string>("")

    useEffect(() => {
        props.signer.getAddress().then(setAddress)
    }, [])

    return <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <button onClick={() => props.layoutChange("SmartBonds")}>Home</button>
        <button onClick={() => props.layoutChange("MyBonds")}>My Bonds</button>
        <button onClick={() => props.layoutChange("Marketplace")}>Marketplace</button>
        <div style={{flexGrow: "1"}} />
        <button>{address.substring(0, 6)}</button>
    </div>
}