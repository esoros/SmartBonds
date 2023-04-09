import './App.css'
import { useEffect, useState } from 'react'
import { ConnectMetamask } from './Components/ConnectMetamask'
import { ContractInterface, Signer } from 'ethers'
import Header, { Layout } from './Components/Header'
import Collection from './Components/Collection'
import TokenService from './Services/TokenService'
import Donate from './Components/Donate'
import ActionSheet from './Components/ActionSheet'
import Admin from './Components/Admin'
import Auction from './Components/Auction'

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

function getLayout(layout: Layout, mnemonic: string, config: Config, renderHeight: number) {
  switch(layout) {
    case "Auction":
        return <Auction mnemonic={mnemonic}/>
    case "Collection":
        return <Collection mnemonic={mnemonic} />
      case "Home": 
        return <Collection mnemonic={mnemonic} />
      case "Donate":
        return <Donate config={config} mnemonic={mnemonic} renderHeight={renderHeight}></Donate>
      case "Admin":
        return <Admin mnemonic={mnemonic} renderHeight={renderHeight}/>
  }
}

function App() {
  const [menmonic, setMnemonic] = useState<string>()
  const [layout, setLayout] = useState<Layout>("Home")
  const [err, setErr] = useState<string>()
  const [tokenService, _] = useState(createTokenService())
  const [config, setConfig] = useState<Config>()
  const [renderHeight, setRenderHeight] = useState<number>(0)

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

  return menmonic == undefined ? 
    <ConnectMetamask onConnect={setMnemonic}></ConnectMetamask> : 
    <div style={{overflowX: "hidden", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%"}}>
        <ActionSheet tokenService={tokenService} />
        <div style={{height: "1%"}} />
        <div style={{flexDirection: "row", width: "100%", display: "flex"}}>
          <Header onRenderHeight={setRenderHeight} onLayout={setLayout} mnemonic={menmonic} />
          <div style={{flexGrow: 1}} />
        </div>
        <div style={{flexGrow: 1}} />
        {
          <div style={{display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
            <div style={{width: "1%"}} />
            {getLayout(layout, menmonic, config, renderHeight)}
            <div style={{width: "1%"}} />
          </div>
        }
        <div style={{flexGrow: 1}} />
    </div>
}

export default App
