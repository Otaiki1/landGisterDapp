import { ethers } from "ethers";
import {useState} from "react";
import LandRegistration from '../components/artifacts/contracts/LandRegistration.sol/LandRegistration.json';

const landRegistrationAddress = "0x7d15e2D849c7A5913cF20aA01802b31946e7265c";
export default function CheckStatus(){

    const[landId, setLandId] = useState(Number);
    const[amount, setAmount] = useState('');


    const connectWallet = async() => {
        const { ethereum } = window;
        let check = await ethereum.request({method: 'eth_requestAccounts'});
        await check;
    }

    const makeRequest = async() =>{
        if (typeof window.ethereum !== 'undefined') {
            await connectWallet()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const landContract = new ethers.Contract(landRegistrationAddress, LandRegistration.abi, signer)
            const transaction = await landContract.purchaseLand(landId, {value: ethers.utils.parseEther(amount)})
        }
    }

    return(
       <div className="row p-5">
            <div className="col-md-6">
                <label htmlFor="exampleFormControlInput1" className="form-label" onChange={(e) => setLandId(e.target.value)}>Enter Land Id: </label>
                <input type="text" className="form-control mb-5" id="exampleFormControlInput1" placeholder="Enter The Land Id"  onChange={(e) => setLandId(e.target.value)} />
                <input type="text" className="form-control mb-5" id="exampleFormControlInput1" placeholder="Enter The amount you want to pay in ether"  onChange={(e) => setAmount(e.target.value)} />
                <button className="btn btn-lg w-100 text-white border-white" onClick={() => makeRequest()}>Purchase Land</button>
            </div>
        </div>
    )
}