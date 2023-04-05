import './App.css'
import { useState } from 'react'
import { ConnectMetamask } from './Components/ConnectMetamask'
import { Signer } from 'ethers'
import HomePage from './Components/HomePage'
import Header, { Layout } from './Components/Header'
import Auction from './Components/Auction'
import Collection from './Components/Collection'
import TokenService from './Services/TokenService'
import Donate from './Components/Donate'

function createTokenService() {
  let tokenService = new TokenService()
  tokenService.AddToken({name: "polygon", address: "0x00"})
  tokenService.Freeze()
  return tokenService
}

function getLayout(layout: Layout, signer: Signer, tokenService: TokenService) {
  switch(layout) {
    case "Auction":
        return <Auction signer={signer}/>
    case "Collection":
        return <Collection signer={signer} />
      case "Home": 
        return <HomePage tokenService={tokenService} signer={signer} />
      case "Donate":
        return <Donate></Donate>
  }
}

function App() {
  const [wallet, setWallet] = useState<Signer>()
  const [layout, setLayout] = useState<Layout>("Home")
  const [err, setErr] = useState<string>()
  const [tokenService, _] = useState(createTokenService())

  if(err) {
    return <p>{err}</p>
  }

  return wallet == undefined ? 
    <ConnectMetamask onConnect={setWallet}></ConnectMetamask> : 
    <div style={{height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div style={{height: "1%"}} />
        <div style={{flexDirection: "row", width: "100%"}}>
          <Header onLayout={setLayout} />
          <div style={{flexGrow: 1}} />
        </div>
        <div style={{flexGrow: 1}} />
        {getLayout(layout, wallet, tokenService)}
        <div style={{flexGrow: 1}} />
    </div>
}

export default App
