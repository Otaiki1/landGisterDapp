import { ethers } from "ethers";
import {useState} from "react";
import LandRegistration from '../contracts/artifact/LandRegistration.json';

const landRegistrationAddress = "0x7d15e2D849c7A5913cF20aA01802b31946e7265c";
export default function Owner(){

    const[landId, setLandId] = useState(Number);
    const [reqAddr, setReqAddr] = useState('')

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts' });
        await check;
    }

    const makeRequest = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.viewRequest(landId)
            setReqAddr(transaction)
        }
    }
    const acceptRequest = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.processRequest(landId, 3)
            alert("You have accepted the request")
        }
    }
    const rejectRequest = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.processRequest(landId, 2)
            alert("you have rejected the request")
        }
    }

    return(
        <>
        <div className="row p-5">
            <div className="col-md-6">
                <label htmlFor="exampleFormControlInput1" className="form-label" onChange={(e) => setLandId(e.target.value)}>Enter Land Id: </label>
                <input type="text" className="form-control mb-5" id="exampleFormControlInput1" placeholder="Enter The Land Id"  onChange={(e) => setLandId(e.target.value)} />
                <button className="btn btn-lg w-100 text-white border-white" onClick={() => makeRequest()}>Check Land</button>
            </div>
        </div>
        <div className="row">
            <button className="btn btn-lg btn-disabled w-100 plain border">Request from: {reqAddr}<span></span></button>
            <div className="col-md-6 p-5">
                    <button className="btn w-100 btn-primary plain" onClick={() => acceptRequest()}>Accept</button>
            </div>
            <div className="col-md-6 p-5">
                    <button className="btn w-100 btn-danger plain" onClick={() => rejectRequest()}>Reject</button>
            </div>
        </div>
        </>
        
    )
   

}