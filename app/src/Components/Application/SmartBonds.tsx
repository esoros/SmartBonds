import { Signer } from "ethers";
import { useEffect, useState } from "react";
import TokenList, { Token } from "../../Services/TokenList";

export default function SmartBonds(props: {
    signer: Signer
    tokenList: TokenList
}) {
    let [address, setAddress] = useState<string>("")
    let [token, tokenList] = useState<Token>(props.tokenList.getTokens()[0])

    useEffect(() => {
        props.signer.getAddress().then(setAddress)
    }, [])

    function selectToken() {

    }

    function purchase() {
        alert("purchase bond")
    }

    return <div className="purchase" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <input />
            <img onClick={selectToken} style={{height: "2rem"}} src={token.name + ".svg"} />
        </div>
        <div>
            <input type={'number'} />
            <img />
            <select>
                <option>seconds</option>
                <option>minutes</option>
                <option>hours</option>
                <option>days</option>
                <option>years</option>
                <option>decades</option>
                <option>centuries</option>
                <option>millenium</option>
            </select>
        </div>
        <button>Purchase Bond</button>
    </div>
}