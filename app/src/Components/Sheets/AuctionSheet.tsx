import { createRef, useEffect, useState } from "react"
import { Signer } from "ethers"

type state = "Processing" | "Placed" | "Error"

export default function AuctionSheet(props: {
    signer: Signer
    pic: string
}) {
    
    let [imageWidth, setImageWidth] = useState<Number>(0)

    function calculateImageWidth() {
        let img  = document.getElementById("audctionsheet_image_div") as HTMLImageElement
        let div = document.getElementById("auctionsheet_div") as HTMLDivElement
        if(img.naturalHeight < div.scrollHeight && img.naturalWidth < div.scrollWidth) {
            setImageWidth(img.naturalWidth)
        } else {
            let scaleWidth = div.scrollWidth / img.naturalWidth
            let scaleHeight = div.scrollHeight * (0.8) / img.naturalHeight
            setImageWidth(Math.min(scaleHeight, scaleWidth) * img.naturalWidth)
        }
    }

    useEffect(() => {
        calculateImageWidth()
        window.addEventListener("resize", calculateImageWidth)
        return () => window.removeEventListener("resize", calculateImageWidth)
    }, [])

    function placeBid() {
        alert("place bid here...")
    }
    
    return <div id="auctionsheet_div" style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center"}}>
    <img id="audctionsheet_image_div" src={"/IMG_" +  props.pic +".png"} style={{marginBottom: "1rem", width: imageWidth + "px"}} />
    <input placeholder="amount" style={{width: imageWidth + "px", padding: ".5rem"}} />
    <div style={{display: "flex", flexDirection: "row", width: imageWidth + "px", alignItems: "center"}}>
        <p style={{margin: 0, padding: 0}}>Highest Bidder:</p>
        <p style={{margin: 0, padding: 0}}>{"0x0000000000000000"}</p>
        <div style={{flexGrow: 1}} />
        <button onClick={placeBid}>Place Bid</button>
    </div>
</div>
}   