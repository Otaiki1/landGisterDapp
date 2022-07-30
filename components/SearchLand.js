
export default function RegisterLand(){

    return(
        <form className="text-white p-5">
            <h1 className="text-center text-white"> Land Search</h1>
            <div className='row mb-3 mt-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Country: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Country" />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">State: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter State" />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">District: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter District" />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Location: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Location" />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Landmark: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Landmark" />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="exampleFormControlInput1" className="form-label">Plot Number: </label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Plot Number" />
                </div>
            </div>
            <div className="row p-3">
                <button className="btn btn-lg w-100 text-white border-white">Search</button>
            </div>
        </form>
    )
} 

// function showResult(){
//     return (
//         <
//     )
// }