import Link from "next/link";

export default function register(){

    return(
        <>
                <div className='row mb-3 text-white p-5'>
                    <div className='col-md-6 p-3'>
                        <Link href="/owner"><button className="btn btn-lg plain btn-primary w-100">Owner</button></Link>
                    </div>
                    <div className='col-md-6 p-3'>
                        <Link href="/buyer"><button className="btn btn-lg plain btn-primary w-100">Buyer</button></Link>
                    </div>
                </div>
  
        </>
    )
}