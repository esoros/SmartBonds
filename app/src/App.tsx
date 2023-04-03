import './App.css'
import { useEffect, useState } from 'react'
import { ConnectMetamask } from './Components/ConnectMetamask'
import { Contract, Signer } from 'ethers'
import HomePage from './Components/HomePage'
import { Layout } from './Components/Header'
import Auction from './Components/Auction'
import Collection from './Components/Collection'

//injecting the config in

function getLayout(layout: Layout, signer: Signer, contract: Contract) {
  switch(layout) {
    case "Auction":
        return <Auction contract={contract} signer={signer}/>
    case "Collection":
        return <Collection contract={contract} signer={signer} />
      case "Home": 
        return <HomePage contract={contract} signer={signer} />
  }
}

function App() {
  const [wallet, setWallet] = useState<Signer>()
  const [layout, setLayout] = useState<Layout>("Home")
  const [contract, setContract] = useState<Contract>()
  const [url, setUrl] = useState("")
  const [err, setErr] = useState<string>()

  useEffect(() => {
    if(!wallet) {
      return
    }
    
    fetch("config.json").then(async resp => {
      if(resp.ok) {
        let config = await resp.json()
        setContract(new Contract("", [], wallet))
      } else {
        setErr("Unable to load config")
      }
    })
  }, [wallet])
2

  if(err) {
    return <p>{err}</p>
  }

  if(!contract) {
    return <p>Loading...</p>
  }

  return wallet == undefined ? 
    <ConnectMetamask onConnect={setWallet}></ConnectMetamask> : 
    getLayout(layout, wallet, contract)
}

export default App
