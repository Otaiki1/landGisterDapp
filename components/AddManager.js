export default function AddManager(){

    return(
        <>
            <div className="card p-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Add Manager</h2>
                    <div className="card-text row mb-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Address: </label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Address" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Location: </label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Location" />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg border-white text-white w-100">Add Manager</button>
                    </div>
                </div>
            </div>
        </>
    )
}