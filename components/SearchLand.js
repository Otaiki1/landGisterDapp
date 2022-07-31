import { useState } from "react";
import {ethers} from "ethers";
import LandRegistration from './artifacts/contracts/LandRegistration.sol/LandRegistration.json';
import Buyer from '../components/Buyer'
const landRegistrationAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

export default function RegisterLand(){

    const[landId, setLandId] = useState(Number)

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const submitEvent = async(e) =>{
        e.preventDefault();
        if (!landId) return
            if (typeof window.ethereum !== 'undefined') {
                await connectWallet()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner()
                const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
                const transaction = await landContract.buyer(landId);
                const status = await transaction.wait();
                console.log(transaction)
            }
    }

    return(
        <form className="text-white p-5">
            <h1 className="text-center text-white"> Land Search</h1>
            <div className="row p-5">
                <div className='col-md-12'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Land Id: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter The Land Id" onChange={(e) => setLandId(e.target.value)}/>
                </div>
            </div>
            <div className="row p-5">
                <button className="btn btn-lg w-100 text-white border-white" onClick={(e) => submitEvent(e)}>Search</button>
            </div>
        </form>
    )
} 

