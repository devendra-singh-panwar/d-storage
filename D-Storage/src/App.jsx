import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MyFiles from './pages/MyFiles'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import D_STORAGE from "./artifacts/contracts/D-Storage.sol/D_Storage.json"

function App() {
  const [signer, setSigner] = useState()
  const [account, setAccount] = useState()
  const connectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contractAddress = "0xd85eA7Bf5036f9B7e74136A553a518dCa01d4aDd";
    const contract = new ethers.Contract(
      contractAddress,
      D_STORAGE.abi,
      provider
    );
    const signer = await provider.getSigner()
    const signerAccount = contract.connect(signer);
    const accountAddress = signer.address
    setSigner(signerAccount)
    setAccount(accountAddress)
  }
  useEffect(() => {
    connectWallet()
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard signer={signer} account={account} />} />
        <Route path='/myFiles/:id' element={<MyFiles signer={signer} />} />
      </Routes>
      
    </>
  )
}

export default App
