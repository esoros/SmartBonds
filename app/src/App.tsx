import './App.css'
import { useState } from 'react'
import { ConnectMetamask } from './Components/ConnectMetamask'
import { Contract, Signer } from 'ethers'
import HomePage from './Components/HomePage'
import { Layout } from './Components/Header'
import Auction from './Components/Auction'
import Collection from './Components/Collection'

function getLayout(layout: Layout, signer: Signer) {
  switch(layout) {
    case "Auction":
        return <Auction signer={signer}/>
    case "Collection":
        return <Collection signer={signer} />
      case "Home": 
        return <HomePage signer={signer} />
  }
}

function App() {
  const [wallet, setWallet] = useState<Signer>()
  const [layout, setLayout] = useState<Layout>("Home")
  const [contract, setContract] = useState<Contract>()
  const [url, setUrl] = useState("")
  const [err, setErr] = useState<string>()

  if(err) {
    return <p>{err}</p>
  }

  return wallet == undefined ? 
    <ConnectMetamask onConnect={setWallet}></ConnectMetamask> : getLayout(layout, wallet)
}

export default App
