import Link from "next/link";

export default function Header(){

    return(
        <>
            <header>
                <nav className="row px-5 bg-dark text-white">
                    <div className="col-md-3 p-1 "><a className="btn btn-dark" href="/register"> Register Asset</a></div>
                    <div className="col-md-3 p-1"> <a className="btn btn-dark" href="/find">Find Asset </a></div>
                    <div className="col-md-3 p-1"> <a className="btn btn-dark" href="/checkstatus">Check Status</a></div>
                    <div className="col-md-3 p-1"> <a className="btn btn-dark">View Profile</a></div>
                </nav>
            </header>
        </>
    )
}