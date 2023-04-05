import { useEffect, useRef, useState } from "react"
import TokenService, { Token } from "../Services/TokenService"

export default function ActionSheet(props: {
    tokenService: TokenService
}) {
    let [closed, setClosed] = useState(true)
    let [left, setLeft] = useState(window.innerWidth * .10)
    let [top, setTop] = useState(window.innerHeight * .10)
    let sheetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        addEventListener("resize", onWindowResize)
        document.getElementById("root")?.addEventListener("ShowActionSheet", onShowActionSheet)
        return () => {
            document.getElementById("root")?.removeEventListener("ShowActionSheet", onShowActionSheet)
            removeEventListener("resize", onWindowResize)
        }
    }, [])
    
    function onWindowResize() {
        setLeft(window.innerWidth * .10)
        setTop(window.innerHeight * .10)
    }

    function onClose(token?: Token) {
        sheetRef.current?.classList.remove("actionSheetDisplay")
        sheetRef.current?.classList.add("actionSheetHide")
        setTimeout(() => setClosed(true), 50)
        document.getElementById("root")?.dispatchEvent(new CustomEvent("ActionSheetClosed", {detail: token}))
    }

    function onShowActionSheet() {
        setClosed(false)
        sheetRef.current?.classList.add("actionSheetDisplay")
    }

    return <div className="actionSheet" ref={sheetRef} style={{
        position: "fixed",
        left: left,
        top: top,
        zIndex: 1,
        height: "80vh",
        width: "80vw",
        backgroundColor:"rgb(249,249,249)",
        display: closed ? "none" : "flex",
        flexDirection: "column"
    }}>
        <button style={{textDecoration: "underline", alignContent: "flex-end", width: "10%", display: "grid", placeContent: "center"}} onClick={() => onClose(undefined)}>close</button>
        {
            props.tokenService.GetTokens().map(token => {
                return <div onClick={() => {onClose(token)}} className="actionSheetHover" style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center"}}>
                    <div style={{width: "3%"}} />
                    <p style={{cursor: "default"}}>{token.name}</p>
                    <div style={{flexGrow: "1"}} />
                    <img src={`/${token.name}.svg`} style={{height: "3vh"}} />
                    <div style={{width: "3%"}} />
                </div>
            })
        }        
    </div>
}