import { createRef, useEffect, useState } from "react"
import "../App.css"
import { BigNumber, Signer } from "ethers"
import { formatEth } from "../Utils/Utils"

export type Layout = "Home" | "Collection" | "Auction" | "Donate" | "Admin"
export default function Header(props: {
    onLayout: (layout: Layout) => void,
    onRenderHeight?: (height: number) => void
    mnemonic: Signer
}) {
    let [err, setErr] = useState<string>()
    let [eth, setEth] = useState<BigNumber>()
    let [address, setAddress] = useState("")
    let [renderHeight, setRenderHeight] = useState<number>()
    let [showDropdown, setShowDropdown] = useState<boolean>(false)
    let [renderWidth, setRenderWidth] = useState<number>(window.innerWidth)
    let distRef = createRef<HTMLDivElement>()

    function getWalletBalance() {
        props.mnemonic.getAddress().then(address => {
            setAddress(address)
            props.mnemonic.provider!.getBalance(address).then(setEth)
        })
    }

    function ethUpdated() {
        getWalletBalance()
    }

    function onSetRenderWidth() {
        setRenderWidth(window.innerWidth)
    }

    useEffect(() => {
        getWalletBalance()
        document.getElementById("root")?.addEventListener("EthereumAmountUpdated", ethUpdated)
        window.addEventListener("resize", onSetRenderWidth)
        return () => {
            document.getElementById("root")?.removeEventListener("EthereumAmountUpdated", ethUpdated)
            window.removeEventListener("resize", onSetRenderWidth)
        }
    }, [])

    useEffect(() => {
        if(distRef.current) {
            setRenderHeight(distRef.current.scrollHeight)
        }
    }, [distRef])

    useEffect(() => {
        if(renderHeight && props.onRenderHeight) {
            props.onRenderHeight(renderHeight)
        }
    }, [renderHeight])

    if(err) {
        return <p>unable to get balance</p>
    }

    if(renderWidth <= 600) {
        return <div ref={distRef} className="header" style={{display: "flex", flexDirection: "row", maxWidth: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <h2 style={{cursor: "default", textDecoration: "underline", textAlign: "center", marginRight: "1rem"}}>smartbonds.ai</h2>
                <div style={{flexGrow : 1}} />
                <button id="menubutton" onClick={() => { setShowDropdown(dropdown => !dropdown)}}  style={{height: "7vh", fontSize: "1.25rem"}}>=</button>
                {
                    showDropdown ? <div style=
                    {{background: "white", display: "flex", flexDirection: "column", zIndex: "1", position: "absolute", 
                        top: document.getElementById("menubutton")?.scrollHeight,
                        left: (document.getElementById("menubutton")?.getBoundingClientRect().left ?? 0) - (document.getElementById("menubutton")?.getBoundingClientRect().width ?? 0)
                    }}
                    >
                        <button style={{height: "7vh", minHeight: "50px"}}>{address.substring(0, 6)}</button>
                        <button style={{height: "7vh", minHeight: "50px"}} onClick={() => {
                            props.onLayout("Home")
                            setShowDropdown(false)
                        }}>Home</button>
                        <button style={{height: "7vh"}} onClick={() => {
                            props.onLayout("Auction")
                            setShowDropdown(false)
                        }}>Marketplace</button>
                        <button style={{height: "7vh"}} onClick={() => {
                            props.onLayout("Collection")
                            setShowDropdown(false)
                        }}>Wallet</button>
                        <button style={{height: "7vh"}}>{formatEth(eth ?? BigNumber.from(0))} Eth</button>
                        <button onClick={() => {
                            props.onLayout("Donate")
                            setShowDropdown(false)
                        }} style={{height: "7vh"}}>😃 Donate</button>
                        <button onClick={() => {
                            window.localStorage.clear()
                            window.location.href = ""
                        }} style={{height: "7vh"}}>Logout
                        </button>
                    </div> : <></>
                }
            </div>
    } else if(renderWidth <= 1000) {
        return <div ref={distRef} className="header" style={{display: "flex", flexDirection: "row", maxWidth: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <h2 style={{cursor: "default", textDecoration: "underline", textAlign: "center", marginRight: "1rem"}}>smartbonds.ai</h2>
                <div style={{flexGrow : 1}} />
                <button style={{height: "7vh", minHeight: "50px"}} onClick={() => {
                    props.onLayout("Home")
                    setShowDropdown(false)
                }}>Home</button>
                <button style={{height: "7vh", minHeight: "50px"}} onClick={() => {
                    props.onLayout("Auction")
                    setShowDropdown(false)
                }}>Marketplace</button>
                <button style={{height: "7vh", minHeight: "50px"}} onClick={() => {
                    props.onLayout("Collection")
                    setShowDropdown(false)
                }}>Wallet</button>
                <button id="menubutton" onClick={() => { setShowDropdown(dropdown => !dropdown)}} 
                    style={{height: "7vh", minHeight: "50px", fontSize: "1.25rem"}}>=</button>
                {
                    showDropdown ? <div style=
                    {{background: "white", display: "flex", flexDirection: "column", zIndex: "1", position: "absolute", 
                        top: document.getElementById("menubutton")?.scrollHeight,
                        left: (document.getElementById("menubutton")?.getBoundingClientRect().left ?? 0) - (document.getElementById("menubutton")?.getBoundingClientRect().width ?? 0)
                    }}
                    >
                        <button style={{height: "7vh", minHeight: "50px"}}>{address.substring(0, 6)}</button>
                        <button style={{height: "7vh", minHeight: "50px"}}>{formatEth(eth ?? BigNumber.from(0))} Eth</button>
                        <button onClick={() => {
                            props.onLayout("Donate")
                            setShowDropdown(false)
                        }} style={{height: "7vh", minHeight: "50px"}}>😃 Donate</button>
                        <button onClick={() => {
                            window.localStorage.clear()
                            window.location.href = ""
                        }} style={{height: "7vh", minHeight: "50px"}}>Logout
                        </button>
                    </div> : <></>
                }
            </div>
    } else {
        return <div ref={distRef} className="header" style={{display: "flex", flexDirection: "row", maxWidth: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
        <h2 style={{cursor: "default", textDecoration: "underline", textAlign: "center", marginRight: "1rem"}}>smartbonds.ai</h2>
        <div style={{flexGrow : 1}} />
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Home")}>Home</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Auction")}>Marketplace</button>
        <button style={{height: "7vh"}} onClick={() => props.onLayout("Collection")}>Wallet</button>
        {
            address == "0x7880aA5B5c9C8d30719Db0747DA60875B9115E19" ? 
            <button style={{height: "7vh"}} onClick={() => props.onLayout("Admin")}>Admin</button> : 
            <></>
        }
        <button id="menubutton" onClick={() => { setShowDropdown(dropdown => !dropdown)}} 
                    style={{height: "7vh", minHeight: "50px", fontSize: "1.25rem"}}>=</button>
        {
            showDropdown ? <div style=
            {{background: "white", display: "flex", flexDirection: "column", zIndex: "1", position: "absolute", 
                top: document.getElementById("menubutton")?.scrollHeight,
                left: (document.getElementById("menubutton")?.getBoundingClientRect().left ?? 0) - (document.getElementById("menubutton")?.getBoundingClientRect().width ?? 0)
            }}
            >
                <button style={{height: "7vh", minHeight: "50px"}}>{address.substring(0, 6)}</button>
                <button style={{height: "7vh", minHeight: "50px"}}>{formatEth(eth ?? BigNumber.from(0))} Eth</button>
                <button onClick={() => {
                    props.onLayout("Donate")
                    setShowDropdown(false)
                }} style={{height: "7vh", minHeight: "50px"}}>😃 Donate</button>
                <button onClick={() => {
                    window.localStorage.clear()
                    window.location.href = ""
                }} style={{height: "7vh", minHeight: "50px"}}>Logout
                </button>
            </div> : <></>
        }
    </div>
    }
}