import { useState } from "react";
import {ethers} from "ethers";
import LandRegistration from './artifacts/contracts/LandRegistration.sol/LandRegistration.json';

const landRegistrationAddress = "0x7d15e2D849c7A5913cF20aA01802b31946e7265c";

export default function RegisterLand(){
    const[state, setState] = useState('')
    const[lga, setLga] = useState('')
    const[location, setLocation] = useState('')
    const[priceSelling, setPriceSelling] = useState(Number)
    const[plotNumber, setPlotNumber] = useState(Number)
    const[available, setAvailability] = useState('')
    const[theAssets, setAssets] = useState([]);

    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const getTheAssets = async() => {

        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            try {
                const data = await landContract.viewAssets()
                console.log(data)
                const assetsMap = data.map(asset => ethers.utils.arrayify(asset._hex)[0]);
                return assetsMap;
              } catch (err) {
                console.log("Error: ", err)
                return err
              }
            
        }
        
    }

    const submitEvent = async(e) =>{
        e.preventDefault();
        if (!state && !lga && !location && !priceSelling && !plotNumber && !available) return
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.register(state, lga, location, plotNumber, ethers.utils.parseUnits(priceSelling), available);
            const status = await transaction.wait();
            const assets = await getTheAssets();
            setAssets(assets);
        }
    }

    return(
        <form className="text-white p-5">
            <h1 className="text-center text-white">Register Your Land</h1>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">State: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter State"  onChange={(e) => setState(e.target.value)}/>
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">LGA: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter District" onChange={(e) => setLga(e.target.value)} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Location: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Location" onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Plot Number: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Plot Number" onChange={(e) => setPlotNumber(e.target.value)} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">PriceSelling(in ether) </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Landmark" onChange={(e) => setPriceSelling(e.target.value)} />
                </div>
                <div className='col-md-6 pt-4'>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setAvailability(e.target.value)}>
                        <option>Select if this land should be up for sale</option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
            </div>
            
            <div className="row p-3">
                <button className="btn btn-lg w-100 text-white border-white" onClick={(e) => submitEvent(e)}>Submit</button>
            </div>
             <div className={theAssets.length > 0 ?"row p-3": "d-none"}>
               <SuccessfulReg id={theAssets}/>
            </div> 
        </form>
        
    )
}

function SuccessfulReg({id}){
    
    return(
        <div>
        <p>You have successfully registered this land and your assets are </p>
        <ul>
        {
            id.map((i, index) => <li key={index}>Land with id of # {i}</li>)
        }
    </ul>
    </div>
    )
}