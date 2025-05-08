export default function NavBar(){
    return (
        <header className="flex flex-row items-center w-[100%] border-gray-500 border-b-4 bg-gray-100">
            <img src={'taxiLogo.png'} className="h-24 cursor-pointer pl-32 pb-2"></img>
            <div className="flex pt-2 gap-8">
                <a className="ml-8" href="/Ride">Ride</a>
                <a href="/Drive">Drive</a>
                <a href="/AboutUs">About us</a>
            </div>
            <div className="flex justify-end w-[100%] mr-40">
                <button className="w-24 h-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none font-medium rounded-full  text-center me-2">Sign up</button>
                <button className="w-24 h-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none font-medium rounded-full  text-center me-2">Sign in</button>
            </div>
        </header>
    )
}