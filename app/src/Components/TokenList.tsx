import TokenService, { Token } from "../Services/TokenService";

export default function TokenList(props: {
    tokenService: TokenService,
    onClose: (token?: Token) => void
})
{
    function onClose(token?: Token) {
        props.onClose(token)
        document.getElementById("root")?.dispatchEvent(new CustomEvent("HideActionSheet"))
    }
    
    return <div>
        {
            props.tokenService.GetTokens().map(token => {
                return <div onClick={() => onClose(token)} className="actionSheetHover" style={{display: "flex", flexDirection: "row", width: "100%", alignItems: "center"}}>
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