
export default function SearchResult({returnObj}){
    console.log(returnObj)
    return(
        <div className="card">
            
            <div className="card-body p-5">
                    <h3 className="card-title text-center mb-4">Land ID: <span></span></h3>
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
                        </div> */}
                        {/* <div className="row">
                            <p>Price Selling: <span>{ethers.utils.parseEther(ethers.utils.arrayify(returnObj[5])[0])}</span></p>
                        </div> */}
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
                        <button className="btn btn-lg w-100 text-white">Request for Land</button>
                    </div>

                </div>
        </div>
    )
}