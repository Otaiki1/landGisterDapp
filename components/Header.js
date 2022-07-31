import Link from "next/link";

export default function Header(){

    return(
        <>
            <header>
                <nav className="row px-5 bg-dark text-white">
                    <div className="col-md-3 p-1 ">
                        <Link href="/register" passRef>
                            <a className="btn btn-dark"> Register Asset</a>
                        </Link>
                   </div>
                   <div className="col-md-3 p-1 ">
                        <Link href="/find" passRef>
                            <a className="btn btn-dark"> Find Asset</a>
                        </Link>
                   </div>
                   <div className="col-md-3 p-1 ">
                        <Link href="/checkstatus" passRef>
                            <a className="btn btn-dark"> Check Status</a>
                        </Link>
                   </div>
                   
                    <div className="col-md-3 p-1"> <a className="btn btn-dark">View Profile</a></div>
                </nav>
            </header>
        </>
    )
}