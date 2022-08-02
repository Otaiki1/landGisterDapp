import { ethers } from "ethers";
import {useState} from "react";
import LandRegistration from '../contracts/artifact/LandRegistration.json';

const landRegistrationAddress = "0x7d15e2D849c7A5913cF20aA01802b31946e7265c";
export default function Owner(){

    const[balance, setBalance] = useState('');

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const checkBalance = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const signerAddress = await signer.getAddress();
            console.log(signerAddress);
            const transaction = await landContract.viewBalance(signerAddress)
            const data = ethers.utils.arrayify(transaction._hex)[0]
            setBalance(data+"Ether");
        }
    }
    const withdrawBalance = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.withdraw();
            alert("Your Withdrawal has been processsed");
        }
    }
 

    return(
        <>
        <div className="row p-5">
            <div className="col-md-6">
                <button className="btn btn-lg w-50 text-white border-white" onClick={() => checkBalance()}>Check Balance</button><span className="text-white display-3">{balance}</span>
                
            </div>
        </div>
        <div className="row">
            <button className="btn btn-lg btn-disabled w-100 plain border" onClick={() => withdrawBalance()}>Withdraw</button>
            
        </div>
        </>
        
    )
   

}