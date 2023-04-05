import { useEffect, useRef, useState } from "react"
import TokenService, { Token } from "../Services/TokenService"

export default function ActionSheet(props: {
    tokenService: TokenService
}) {
    let [closed, setClosed] = useState(true)
    let [left, setLeft] = useState(window.innerWidth * .10)
    let [top, setTop] = useState(window.innerHeight * .10)
    let [content, setContent] = useState<React.ReactElement>()
    let sheetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        addEventListener("resize", onWindowResize)
        document.getElementById("root")?.addEventListener("ShowActionSheet", onShowActionSheet)
        document.getElementById("root")?.addEventListener("HideActionSheet", onClose)
        return () => {
            document.getElementById("root")?.removeEventListener("ShowActionSheet", onShowActionSheet)
            document.getElementById("root")?.removeEventListener("HideActionSheet", onClose)
            removeEventListener("resize", onWindowResize)
        }
    }, [])
    
    function onWindowResize() {
        setLeft(window.innerWidth * .10)
        setTop(window.innerHeight * .10)
    }

    function onClose() {
        sheetRef.current?.classList.remove("actionSheetDisplay")
        sheetRef.current?.classList.add("actionSheetHide")
        setTimeout(() => {
            setClosed(true)
            setContent(undefined)
        }, 100)
    }

    function onShowActionSheet(event: any) {
        setClosed(false)
        if(event.detail) {
            setContent(event.detail)
        }
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
        <button style={{textDecoration: "underline", alignContent: "flex-end", width: "10%", display: "grid", placeContent: "center"}} onClick={() => onClose()}>close</button>
        {
            content
        }        
    </div>
}