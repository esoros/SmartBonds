import { Contract, Signer } from "ethers"
import "../App.css"
import AuctionSheet from "./Sheets/AuctionSheet"

export function CollectionCard(props: {pic: string, signer: Signer}) {
    
    //moving this over to scaled images and then g2g?

    function showAuctionDialog() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <AuctionSheet signer={props.signer} pic={props.pic} />
        }))
    }
    
    return <div style={{height: "30vh", borderRadius: ".5rem", background: "rgb(249,249,249)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
        <div className="collectionImg" style={{display: "flex", flexDirection: "column", height: "100%", zIndex: 0, width: "60%"}}>
            <img onClick={showAuctionDialog} src={"/IMG_" +  props.pic +".png"} style={{height: "80%"}} />
            <div className="nftButton" onClick={showAuctionDialog} style={{display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "white"}}>
                <p style={{cursor: "default"}}>3 Eth</p>
                <p style={{cursor: "default"}}>Ends in: 10 hours</p>
            </div>
        </div>
    </div>
}

export default function Collection(props: {
    signer: Signer,
}) {
    let pics = new Set(["9707", "6898", "1066", "1923", "3796", "2250", "4020", "4113", "4061", "4863", "6094", "4960", "5360", "5076", "5661", "6094", "1066"])
    return   <div className="collectionGrid">
                {
                    Array.from(pics).sort(() => .5 - Math.random()).map(pic => {
                        return <CollectionCard signer={props.signer} pic={pic} />
                    })
                }
        </div>
}
