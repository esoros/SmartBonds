import { Signer } from "ethers";
import { CollectionCard } from "./Collection";

export default function Auction(props: {
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