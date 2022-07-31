import { ethers } from "hardhat";
import {useState} from "react"
export default function Owner(){

    [landId, setLandId] = useState(Number);
    [returnObj, setReturnObj] = useState([]);

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const viewRequests = async(e) =>{
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.viewRequest(landId)
            setReturnObj(transaction)
        }
    }
    return(
        <div className="card">
            <form className="text-white p-5">
                <h1 className="text-center text-white"> Land Search</h1>
                <div className="row p-5">
                    <div className='col-md-12'>
                        <label htmlFor="exampleFormControlInput1" className="form-label">Enter Land Id: </label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter The Land Id" onChange={(e) => setLandId(e.target.value)}/>
                    </div>
                </div>
                <div className="row p-5">
                    <button className="btn btn-lg w-100 text-white border-white" onClick={(e) => viewRequests(e)}>show Requests</button>
                </div>

            </form>
            <div className="card-body p-5">
                    <h3 className="card-title text-center mb-4">Land ID: {landId}<span></span></h3>
                    
                        <div className="row">
                            <p>Person Making request: <span>{returnObj[0]}</span></p>
                        </div>

                    <div className="row">
                        <button className="btn btn-lg w-100 text-white">Accept Request</button>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg w-100 text-white">Reject Request</button>
                    </div>
                </div>
        </div>
    )
}