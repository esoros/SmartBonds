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
            unit: unit,
            address: token.address
        }
        alert("call smart contract here..." + JSON.stringify(mintArgs))
    }

    return <div style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
        <div style={{flexGrow: 1}} />
        <div style={{placeSelf: "center", display: "flex", flexDirection: "column", height: "30%", width: "60%", alignItems: "center", justifyContent: "center", borderRadius: ".25rem", backgroundColor: "rgb(249,249,249)"}}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <input type="range" value={duration} min={1} max={100} onChange={(e) => setDuration(parseInt
                    (e.target.value))} />
                <p>{duration}</p>
                <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{height: "4vh", placeSelf: "center"}}>
                    <option value={"seconds"}>seconds</option>
                    <option value={"minutes"}>minutes</option>
                    <option value={"hours"}>hours</option>
                    <option value={"days"}>days</option>
                    <option value={"years"}>years</option>
                </select>
            </div>
            <div style={{display: "flex", flexDirection: "row", margin: "1.5%", gap: "3%"}}>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} />
                <img onClick={() => alert("show change token modal here...")} style={{height: "1.5rem"}} src={`/${token.name}.svg`} />
            </div>
            <button onClick={() => mint()} style={{backgroundColor: "rgb(122,74,221)", width: "70%", margin: "1.5%"}}>
                Mint
            </button>
        </div>
        <div style={{flexGrow: 1}} />
    </div>
}