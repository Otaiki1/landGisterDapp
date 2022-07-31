import { useState } from "react";
import {ethers} from "ethers";
import LandRegistration from '../components/artifacts/contracts/LandRegistration.sol/LandRegistration.json';

const landRegistrationAddress = "0x7d15e2D849c7A5913cF20aA01802b31946e7265c";

const SearchResult =({returnObj, theLandId} )=>{

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const makeRequest = async() =>{
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.requestToLandOwner(theLandId)
            alert("you have successfully made a request to the land")
        }
    }

    console.log(returnObj)
    return(
        <div className="card">
            
            <div className="card-body p-5">
                    <h3 className="card-title text-center mb-4">Land ID: {theLandId}<span></span></h3>
                    <div className="card-text row mb-3">
                        <div className="row">
                            <p>Current Owner:</p>
                            <p>{returnObj[4]}</p>
                        </div>
                        <div className="row">
                            <p>Price Selling: <span>{returnObj[0]}</span></p>
                        </div>
                        <div className="row">
                            <p>State: <span>{returnObj[0]}</span></p>
                        </div>
                        <div className="row">
                            <p>Lga: <span>{returnObj[1]}</span></p>
                        </div>
                        <div className="row">
                            <p>Location: <span>{returnObj[2]}</span></p>
                        </div>
                        {/* <div className="row">
                            <p>Plot Number: <span>{ethers.utils.arrayify(returnObj[3])[0]}</span></p>
                        </div>  */}
                        {/* <div className="row">
                            <p>Price Selling: <span>{ethers.utils.parseEther(ethers.utils.arrayify(returnObj[5])[0]).toString()}</span></p>
                        </div>  */}
                        <div className="row">
                            <p>Person Making request: <span>{returnObj[7]}</span></p>
                        </div>
                        <div className="row">
                            <p>Request status: <span>{returnObj[8] < 3 ? "Rejected/Unapproved": "Accepted" }</span></p>
                        </div>
                        <div className="row">
                            <p>Available for sale: <span>{returnObj[6] ? "Yes" : "No"}</span> </p>
                        </div>
                    </div> 
                    <div className="row">
                        <button className="btn btn-lg w-100 text-white" onClick={() => makeRequest()}>Request for Land</button>
                    </div>

                </div>
        </div>
    )
}



export default function RegisterLand(){

    const[landId, setLandId] = useState(Number)
    const[returnObject, setReturnObject] = useState([])

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
                setReturnObject(transaction);
            }
    }
    console.log(returnObject)
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
            <SearchResult returnObj={returnObject} theLandId={landId}/>
        </>
        

    )
} 


