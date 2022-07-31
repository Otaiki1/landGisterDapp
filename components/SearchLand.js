import { useState } from "react";
import {ethers} from "ethers";
import LandRegistration from './artifacts/contracts/LandRegistration.sol/LandRegistration.json';
import SearchResult from './SearchResult'
const landRegistrationAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";


export default function RegisterLand(){

    const[landId, setLandId] = useState(Number)
    const[returnObject, setReturnObject] = useState()

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
                if(transaction) setReturnObject(transaction);
            }
    }

    return(
        <>
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
            {returnObject && <SearchResult returnObj={returnObject} />} 
        </>
        

    )
} 

