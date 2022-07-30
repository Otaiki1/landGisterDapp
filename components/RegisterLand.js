import { useState } from "react";
import {ethers} from "ethers";
import LandRegistration from './artifacts/contracts/LandRegistration.sol/LandRegistration.json';

const landRegistrationAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"

export default function RegisterLand(){
    const[country, setCountry] = useState('')
    const[state, setState] = useState('')
    const[lga, setLga] = useState('')
    const[location, setLocation] = useState('')
    const[landmark, setLandmark] = useState('')
    const[plotNumber, setPlotNumber] = useState('')
    const[ownerAddress, setOwnerAddress] = useState('')

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const submitEvent = async(e) =>{
        e.preventDefault();
        if (!country && !state && !district && !location && !landmark && !plotNumber && !ownerAddress) return
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await contract.connect(signer).register(state, lga, location, plotNumber, );
            await transaction.wait();
            // fetchGreeting()
        }
    }

    return(
        <form className="text-white p-5">
            <h1 className="text-center text-white">Register Your Land</h1>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Country: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Country"  onChange={(e) => setCountry(e.target.value)}/>
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">State: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter State"  onChange={(e) => setState(e.target.value)}/>
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">LGA: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter District" onChange={(e) => setLga(e.target.value)} />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Location: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Location" onChange={(e) => setLocation(e.target.value)} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Landmark: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Landmark" onChange={(e) => setLandmark(e.target.value)} />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Plot Number: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Plot Number" onChange={(e) => setPlotNumber(e.target.value)} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Owner Address: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Owner Address" onChange={(e) => setOwnerAddress(e.target.value)} />
                </div>
                
            </div>
            <div className="row p-3">
                <button className="btn btn-lg w-100 text-white border-white" onClick={(e) => submitEvent(e)}>Submit</button>
            </div>
        </form>
    )
}