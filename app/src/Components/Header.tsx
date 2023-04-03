export type Layout = "Home" | "Collection" | "Auction"

export default function Header(props: {
    onLayout: (layout: Layout) => void
}) {
    return <div style={{display: "flex", flexDirection: "row"}}>
        <button onClick={() => props.onLayout("Home")}>Home</button>
        <button onClick={() => props.onLayout("Collection")}>Collection</button>
        <button onClick={() => props.onLayout("Auction")}>Auction</button>
    </div>
}