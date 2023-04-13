import { Signer } from "ethers";
import { CollectionCard } from "./Collections";
import { useEffect, useState } from "react";

export default function Wallet(props: {
    mnemonic: Signer,
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
                <h3 >Your NFTs</h3>
                <h3 />
                <h3 />
                {
                    Array.from(pics).map(pic => {
                        return <CollectionCard signer={props.mnemonic} pic={pic} status={<button style={{width: "100%"}}>List</button>} />
                    })
                }
        </div>
}