import './App.css'
import { useEffect, useState } from 'react'
import { ConnectMetamask } from './Components/ConnectMetamask'
import { ContractInterface, Signer } from 'ethers'
import HomePage from './Components/HomePage'
import Header, { Layout } from './Components/Header'
import Auction from './Components/Auction'
import Collection from './Components/Collection'
import TokenService from './Services/TokenService'
import Donate from './Components/Donate'
import ActionSheet from './Components/ActionSheet'

export type Config = {
  donationAddress: string,
  address: string,
  abi: ContractInterface
}

function verifyConfig(config: any) {
  if(!config.donationAddress) {
    throw new Error("unable to validate config")
  }
  if(!config.address) {
    throw new Error("unable to validate config")
  }
  if(!config.abi) {
    throw new Error("unable to validate config")
  }
  return config as Config
}

function createTokenService() {
  let tokenService = new TokenService()
  tokenService.AddToken({name: "polygon", address: "0x00", color: "rgb(122,74,221)"})
  tokenService.AddToken({name: "bitcoin", address: "0x00", color: "rgb(233,152,61)"})
  tokenService.Freeze()
  return tokenService
}

function getLayout(layout: Layout, signer: Signer, tokenService: TokenService, config: Config) {
  switch(layout) {
    case "Auction":
        return <Auction signer={signer}/>
    case "Collection":
        return <Collection signer={signer} />
      case "Home": 
        return <HomePage tokenService={tokenService} signer={signer} />
      case "Donate":
        return <Donate config={config} signer={signer}></Donate>
  }
}

function App() {
  const [wallet, setWallet] = useState<Signer>()
  const [layout, setLayout] = useState<Layout>("Home")
  const [err, setErr] = useState<string>()
  const [tokenService, _] = useState(createTokenService())
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    fetch("./config.json").then(async resp => {
      if(resp.ok) {
        setConfig(verifyConfig(await resp.json()))
      } else {
        setErr("unable to load config")
      }
    })
  }, [])

  if(err) {
    return <p>{err}</p>
  }

  if(!config) {
    return <p>Loading...</p>
  }

  return wallet == undefined ? 
    <ConnectMetamask onConnect={setWallet}></ConnectMetamask> : 
    <div style={{overflowX: "hidden", height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <ActionSheet tokenService={tokenService} />
        <div style={{height: "1%"}} />
        <div style={{flexDirection: "row", width: "100%"}}>
          <Header onLayout={setLayout} signer={wallet} />
          <div style={{flexGrow: 1}} />
        </div>
        <div style={{flexGrow: 1}} />
        {getLayout(layout, wallet, tokenService, config)}
        <div style={{flexGrow: 1}} />
    </div>
}

export default App
