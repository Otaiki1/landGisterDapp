export default function LandRequest(){

    return(
        <div className="card">
            <div className="card-body">
                    <h3 className="card-title text-center mb-4">Land no: <span></span></h3>
                    <div className="card-text row mb-3">
                        <div className="row">
                            <p>Property Details</p>
                            <p>Plot Number: <span></span></p>
                            <p>State: <span></span></p>
                            <p>District: <span></span></p>
                            <p>Location: <span></span></p>
                            <p>Landmark: <span></span></p>
                        </div>
                        <div className="row">
                            <button className="btn btn-lg btn-disabled w-100 plain border">Request from: <span></span></button>
                            <div className="col-md-6 p-5">
                                 <button className="btn w-100 btn-primary plain">Accept</button>
                            </div>
                            <div className="col-md-6 p-5">
                                 <button className="btn w-100 btn-danger plain">Reject</button>
                            </div>
                        </div>
                        <div className="row g-0">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <button className="btn w-100 btn-success plain">Make Available</button>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>   
                </div>
        </div>
    )
}