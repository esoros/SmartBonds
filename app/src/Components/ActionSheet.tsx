import { useEffect, useRef, useState } from "react"
import TokenService, { Token } from "../Services/TokenService"

export default function ActionSheet(props: {
    tokenService: TokenService
}) {
    let [closed, setClosed] = useState(true)
    let [left, setLeft] = useState(0)
    let [top, _] = useState(window.innerHeight * .10)
    let [content, setContent] = useState<React.ReactElement>()
    let sheetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        onWindowResize()
        window.addEventListener("resize", onWindowResize)
        document.getElementById("root")?.addEventListener("ShowActionSheet", onShowActionSheet)
        document.getElementById("root")?.addEventListener("HideActionSheet", onClose)
        return () => {
            document.getElementById("root")?.removeEventListener("ShowActionSheet", onShowActionSheet)
            document.getElementById("root")?.removeEventListener("HideActionSheet", onClose)
            window.removeEventListener("resize", onWindowResize)
        }
    }, [])

    useEffect(() => {
        onWindowResize()
    }, [sheetRef.current])
    
    function onWindowResize() {
        console.log("window resize", {
            windowWidth: window.innerWidth * .60,
            modalWidth: 400
        })
        let divWidth = Math.max(window.innerWidth * .40, 350)
        setLeft((window.innerWidth - divWidth) / 2)
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
        width: "40vw",
        minWidth: "350px",
        backgroundColor:"white",
        display: closed ? "none" : "flex",
        flexDirection: "column",
        borderRadius: ".25rem"
    }}>
        <button style={{backgroundColor: "white", textDecoration: "underline", alignContent: "flex-end", width: "10%", display: "grid", placeContent: "center"}} onClick={() => onClose()}>close</button>
        {
            content
        }        
    </div>
}