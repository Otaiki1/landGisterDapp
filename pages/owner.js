import { ethers } from "ethers";
import {useState} from "react";

export default function Owner(){
    return(
        <div className="row p-5">
        <div className="col-md-6">
            <label htmlFor="exampleFormControlInput1" className="form-label">Enter Land Id: </label>
            <input type="text" className="form-control mb-5" id="exampleFormControlInput1" placeholder="Enter The Land Id"/>
            <button className="btn btn-lg w-100 text-white border-white">Check Land</button>
        </div>
    </div>
    )
   

}