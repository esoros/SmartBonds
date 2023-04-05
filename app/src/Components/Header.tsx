export type Layout = "Home" | "Collection" | "Auction" | "Donate"
import "../App.css"

export default function Header(props: {
    onLayout: (layout: Layout) => void
}) {
    return <div className="header" style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <div style={{width: "3%"}}></div>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Home")}>Home</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Collection")}>Collection</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Auction")}>Auction</button>
        <div style={{flexGrow: 1}} />
        <button onClick={() => props.onLayout("Donate")} style={{height: "7vh"}}>Donate</button>
        <div style={{width: "3%"}}></div>
    </div>
}