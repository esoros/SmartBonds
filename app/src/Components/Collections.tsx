import { Signer } from "ethers"
import "../App.css"
import AuctionSheet from "./Sheets/AuctionSheet"
import { createRef, useEffect, useState } from "react"

export function CollectionCard(props: {pic: string, signer: Signer, status?: React.ReactNode}) {
    let divRef = createRef<HTMLDivElement>()
    let imgRef = createRef<HTMLImageElement>()
    let [imageWidth, setImageWidth] = useState<number>(0)
    let [naturalImageWidth, setNaturalImageWidth] = useState<number>()
    let [naturalImageHeight, setNaturalImageHeight] = useState<number>()

    async function calculateImageWidth() {
        if(!naturalImageHeight || !naturalImageWidth || !divRef.current) {return}
        if(naturalImageHeight < divRef.current.scrollHeight && naturalImageWidth < divRef.current.scrollWidth) {
            setImageWidth(naturalImageWidth)
        } else {
            let scaleWidth = divRef.current.scrollWidth * (0.9) / naturalImageWidth
            let scaleHeight = divRef.current.scrollHeight * (0.7) / naturalImageHeight
            setImageWidth(Math.min(scaleHeight, scaleWidth) * naturalImageWidth)
        }
    }

    function setImageNaturalWidthAndHeight(e: any) {
        setNaturalImageWidth((e.target as any).naturalWidth)
        setNaturalImageHeight((e.target as any).naturalHeight)
    }

    useEffect(() => {
        window.addEventListener("resize", calculateImageWidth)
        return () => window.removeEventListener("resize", calculateImageWidth)
    }, [])

    useEffect(() => {
        calculateImageWidth()
        if(imgRef.current) {
            imgRef.current.addEventListener("load", setImageNaturalWidthAndHeight)
        }
        return () => imgRef.current?.removeEventListener("load", setImageNaturalWidthAndHeight)
    }, [divRef.current, imgRef.current])

    useEffect(() => {
        calculateImageWidth()
    }, [naturalImageHeight, naturalImageWidth])

    function showAuctionDialog() {
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ShowActionSheet", {
            detail: <AuctionSheet pic={props.pic} />
        }))
    }

    return <div ref={divRef} style={{height: "375px", borderRadius: ".5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
        <div className="collectionImg" style={{display: "flex", flexDirection: "column", height: "100%", zIndex: 0, width: "60%", placeSelf: "center", justifyContent: "center"}}>
            <img  ref={imgRef} onClick={showAuctionDialog} src={"/IMG_" +  props.pic +".png"} style={{width: imageWidth + "px", placeSelf: "center", borderRadius: ".25rem .25rem 0px 0px"}} />
            <div className="nftButton" onClick={showAuctionDialog} style={{borderRadius: "0px 0px .5rem .5rem", placeSelf: "center", display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor: "white", width: imageWidth + "px"}}>
                {
                    props.status ? props.status : 
                    <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
                        <p style={{cursor: "default"}}>3 Eth</p>
                        <p style={{cursor: "default"}}>Ends in: 10 hours</p>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default function Collections(props: {
    mnemonic: Signer,
    onSelectCollection: () => void
}) {
    let [width, setWidth] = useState<number>(window.innerWidth)
    let [collection1] = useState(new Set(["9707", "6898", "1066", "1923", "3796", "2250"].sort(() => .5 - Math.random())))
    let [collection2] = useState(new Set(["4020", "4113", "4061", "4863", "6094", "4960"].sort(() => .5 - Math.random())))
    
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

    return <div style={{}} className={gridClass}>
                <h3 onClick={() => {
                    window.location.href = "/collection/Lebron%20James"
                    props.onSelectCollection()
                }} className="collectionImg" style={{cursor: "pointer", textDecoration: "underline"}}>Lebron James Collection (12 items)</h3>
                <h3 style={{margin: 0, padding: 0}}/>
                <h3 style={{margin: 0, padding: 0}}/>
                {
                    Array.from(collection1).map(pic => {
                        return <CollectionCard signer={props.mnemonic} pic={pic} />
                    })
                }
                <h3 onClick={() => {
                window.location.href = "/collection/Team%20Spirit"
                props.onSelectCollection()
                }} className="collectionImg" style={{cursor: "pointer", textDecoration: "underline"}}>Team Spirit (12 items)</h3>
                <h3 style={{margin: 0, padding: 0}}/>
                <h3 style={{margin: 0, padding: 0}}/>
                {
                    Array.from(collection2).map(pic => {
                        return <CollectionCard signer={props.mnemonic} pic={pic} />
                    })
                }
        </div>
    
}
