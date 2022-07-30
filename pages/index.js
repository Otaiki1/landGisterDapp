
import { ethers } from "ethers";
import{useState} from 'react';




export default function Land(){
    const[connected, setConnected] = useState(false);
    
    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
        return check;
    }

    return(
        <>
           <h1 className="text-center text-white pt-5">Welcome to LandGister</h1> 
           <div className={!connected ?"row p-5":"d-none"}>
                <div className="col-md-4"></div>
                <div className="col-md-4"><button className="plain btn btn-lg text-white w-100" onClick={async() => {let check = await connectWallet();if(check) setConnected(true)}}>Connect Wallet</button></div>
                <div className="col-md-4"></div>
           </div>
           <div className={connected ? "row p-5" : "d-none"}>
                <div className="col-md-4"></div>
                <div className="col-md-4"><p>You have succesfully connected your wallet</p></div>
                <div className="col-md-4"></div>
           </div>
        </>
    )
}