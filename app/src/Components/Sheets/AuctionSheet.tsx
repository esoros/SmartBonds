import { useEffect, useState } from "react"
import { Signer } from "ethers"

export default function AuctionSheet(props: {
    mnemonic: string
    pic: string
}) {
    let [imageWidth, setImageWidth] = useState<Number>(0)
    let [bidAmount, setBidAmount] = useState<string>("Bid Amount:")

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
    
    return <div id="auctionsheet_div" style={{display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center"}}>
    <img id="audctionsheet_image_div" src={"/IMG_" +  props.pic +".png"} style={{width: imageWidth + "px", borderRadius: ".25rem .25rem 0px 0px"}} />
    <div style={{borderRadius: "0px 0px .25rem .25rem", paddingBottom: ".25rem", display: "flex", flexDirection: "column", backgroundColor: "white", width: imageWidth + "px"}}>
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <img src="bitcoin.svg" style={{height: "2vh", marginTop: ".70rem", marginLeft: "1rem"}} />
            <input className="auctioninput" value={"  " + bidAmount} placeholder=" bid amount" style={{marginTop: ".40rem", border: "0", height: "3vh"}} onChange={(e) => setBidAmount(e.target.value.trimStart())} />
        </div>
        <div style={{marginBottom: "0px 0px .25rem .25rem", backgroundColor: "white", display: "flex", flexDirection: "row", width: imageWidth + "px", alignItems: "center", justifyContent: "center"}}>
            <p style={{margin: 0, padding: 0, paddingLeft: "1rem"}}>Highest Bidder:</p>
            <div style={{flexGrow: 1}} />
            <p style={{margin: 0, padding: 0}}>{"0x0000000000000000"}</p>
            <div style={{flexGrow: 1}} />
            <button style={{cursor: "default", margin: ".25rem"}} onClick={placeBid}>Place Bid</button>
        </div>
    </div>
</div>
}   