import { Contract, Signer } from "ethers"
import { useEffect, useState } from "react"
import TokenService from "../Services/TokenService"

export default function HomePage(props: {
    signer: Signer,
    tokenService: TokenService
}) {
    let [amount, setAmount] = useState("0.00")
    let [duration, setDuration] = useState(10)
    let [unit, setUnit] = useState("hours")
    let [token, setToken] = useState(props.tokenService.GetDefaultToken())

    useEffect(() => {
        
    }, [])

    function mint() {
        let mintArgs = {
            amount: amount,
            duration: duration,
            unit: unit
        }
        alert("call smart contract here..." + JSON.stringify(mintArgs))
    }

    return <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "column", border: "solid black .1rem", height: "10rem", width: "30rem", alignItems: "center", justifyContent: "center", borderRadius: ".25rem"}}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <input type="range" value={duration} min={1} max={100} onChange={(e) => setDuration(parseInt
                    (e.target.value))} />
                <p>{duration}</p>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{margin: 0, padding: 0}}>
                    <option value={"seconds"}>seconds</option>
                    <option value={"minutes"}>minutes</option>
                    <option value={"hours"}>hours</option>
                    <option value={"days"}>days</option>
                    <option value={"years"}>years</option>
                </select>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} />
                <img onClick={() => alert("show change token modal here...")} style={{height: "1.5rem"}} src={`/${token.name}.svg`} />
            </div>
            <button onClick={() => mint()} style={{width: "90%"}}>
                Mint
            </button>
        </div>
    </div>
}