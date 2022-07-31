
export default function RegisterLand(){

    return(
        <form className="text-white p-5">
            <h1 className="text-center text-white"> Land Search</h1>
            <div className="row p-5">
                <div className='col-md-12'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Enter Land Id: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Plot Number" />
                </div>
            </div>
            <div className="row p-5">
                <button className="btn btn-lg w-100 text-white border-white">Search</button>
            </div>
        </form>
    )
} 

