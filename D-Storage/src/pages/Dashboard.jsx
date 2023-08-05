import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Dashboard = ({ signer, account }) => {
    const [mode, setMode] = useState("dark")
    const toggleMode = () => mode == 'dark' ? setMode("light") : setMode("dark")
    return (
        <div>
            <Navbar />
            {
                !account ?
                    <div className='text-center my-5' >
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div> : <Main account={account} signer={signer} />
            }
            <Footer/>

        </div>
    )
}

export default Dashboard