import { Signer } from "ethers"
import "../App.css"
import AuctionSheet from "./Sheets/AuctionSheet"
import { createRef, useEffect, useState } from "react"

export function CollectionCard(props: {pic: string, signer: Signer}) {
    let divRef = createRef<HTMLDivElement>()
    let imgRef = createRef<HTMLImageElement>()
    let [imageWidth, setImageWidth] = useState<Number>(0)

    function calculateImageWidth() {
        if(!imgRef.current || !divRef.current) {return}
        if(imgRef.current.naturalHeight < divRef.current.scrollHeight && imgRef.current.naturalWidth < divRef.current.scrollWidth) {
            setImageWidth(imgRef.current.naturalWidth)
        } else {
            let scaleWidth = divRef.current.scrollWidth * (0.9) / imgRef.current.naturalWidth
            let scaleHeight = divRef.current.scrollHeight * (0.7) / imgRef.current.naturalHeight
            setImageWidth(Math.min(scaleHeight, scaleWidth) * imgRef.current.naturalWidth)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", calculateImageWidth)
        return () => window.removeEventListener("resize", calculateImageWidth)
    }, [])

    useEffect(() => {
        calculateImageWidth()
    }, [divRef.current, imgRef.current])

    function showAuctionDialog() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <AuctionSheet signer={props.signer} pic={props.pic} />
        }))
    }    
    return <div ref={divRef} style={{height: "375px", borderRadius: ".5rem", background: "rgb(249,249,249)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
        <div className="collectionImg" style={{display: "flex", flexDirection: "column", height: "100%", zIndex: 0, width: "60%", placeSelf: "center", justifyContent: "center"}}>
            <img ref={imgRef} onClick={showAuctionDialog} src={"/IMG_" +  props.pic +".png"} style={{width: imageWidth + "px", placeSelf: "center", borderRadius: ".25rem .25rem 0px 0px"}} />
            <div className="nftButton" onClick={showAuctionDialog} style={{borderRadius: "0px 0px .5rem .5rem", placeSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "white", width: imageWidth + "px"}}>
                <p style={{cursor: "default"}}>3 Eth</p>
                <p style={{cursor: "default"}}>Ends in: 10 hours</p>
            </div>
        </div>
    </div>
}

export default function Collection(props: {
    signer: Signer,
}) {
    let [width, setWidth] = useState<number>(window.innerWidth)
    let [pics, _] = useState(new Set(["9707", "6898", "1066", "1923", "3796", "2250", "4020", "4113", "4061", "4863", "6094", "4960", "5360", "5076", "5661", "6094", "1066"].sort(() => .5 - Math.random())))
    
    function setWindowWidth() {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", setWindowWidth)
        return () => window.removeEventListener("resize", setWindowWidth)
    },[])

    let gridClass = "collectionGrid"
    if(width > 600 && width < 1000) {
        gridClass = "collectionGrid800"
    } else if (width > 0 && width < 600) {
        gridClass = "collectionGrid300"
    }

    return   <div className={gridClass}>
                {
                    Array.from(pics).map(pic => {
                        return <CollectionCard signer={props.signer} pic={pic} />
                    })
                }
        </div>
}
