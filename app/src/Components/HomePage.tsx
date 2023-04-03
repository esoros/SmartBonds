import { Contract, Signer } from "ethers"
import { useEffect, useState } from "react"

export default function HomePage(props: {
    signer: Signer,
    contract: Contract
}) {
    let [address, setAddress] = useState<string>()
    
    useEffect(() => {
        props.signer.getAddress().then(setAddress)
    }, [])

    return <div style={{display: "flex", flexDirection: "column"}}>
        <p>Welcome to smart bonds</p>
        {address}
    </div>
}