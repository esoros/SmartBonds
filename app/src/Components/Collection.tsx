import { Contract, Signer } from "ethers"

export default function Collection(props: {
    signer: Signer,
}) {
    return <div>
        <p>No Smart Bonds found, please visit the store</p>
    </div>
}