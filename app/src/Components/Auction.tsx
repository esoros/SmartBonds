import { Contract, Signer } from "ethers";

export default function Auction(props: {
    signer: Signer,
}) {
    return <div>
        <p>No Bonds for sale, please check back later</p>
    </div>
}