import { useEffect, useState } from 'react'
import './App.css'
import { Signer } from 'ethers'
import { ConnectMetamask } from './Components/ConnectMetamask'
import SmartBonds from './Components/Application/SmartBonds'
import Header from './Components/Header'
import Marketplace from './Components/Application/Marketplace'
import MyBonds from './Components/Application/MyBonds'
import TokenList from './Services/TokenList'
import { verifyResp } from './Debug/Verify'

export type Config = {
  address: string,
  abi: string
}

export type Layout = "Marketplace" | "MyBonds" | "SmartBonds"

function getLayout(layout: Layout, wallet: Signer, tokenList: TokenList) {
  if(layout == "Marketplace") {
    return <Marketplace />
  } else if (layout == "MyBonds") {
    return <MyBonds />
  } else {
    return <SmartBonds signer={wallet} tokenList={tokenList} />
  }
}

function App() {
  const [wallet, setWallet] = useState<Signer>()
  const [layout, setLayout] = useState<Layout>("SmartBonds")
  const [config, setConfig] = useState<Config>()
  const [err, setErr] = useState<String>()
  
  useEffect(() => {
    fetch("./config.json").then(resp => verifyResp(resp, {
      address: "", abi: ""
    })).then(setConfig).catch(setErr)
  }, [])

  if(err) {
    return <p>{err}</p>
  } else if(!config) {
    return <p>Loading...</p>
  } else {
    let tokenList = new TokenList()
    tokenList.addTokens({name: "bitcoin", address: ""})
    tokenList.freeze()
  
    return wallet == undefined ? <ConnectMetamask onConnect={setWallet} /> : 
      <div>
          <Header layoutChange={setLayout} signer={wallet} />
          {getLayout(layout, wallet, tokenList)}
      </div>
  }
}

export default App
