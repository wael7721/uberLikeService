export default function NavBar(){
    return (
        <header className="flex flex-row items-center h-16 w-[100%] shadow-sm bg-black">
            <a href="/" className="ml-32 pb-2">
            <img src={'taxiLogoWhite.png'} className="w-32 h-24 cursor-pointer"></img>
            </a>
            <div className="flex pt-1 gap-8 text-nowrap text-white text-center">
                <a className="pl-3 pr-3 ml-8 hover:bg-gray-900 transition-all rounded-full" href="/Ride">Ride</a>
                <a className="pl-3 pr-3 hover:bg-gray-900 transition-all rounded-full" href="/Drive">Drive</a>
                <a className="pl-3 pr-3 hover:bg-gray-900 transition-all rounded-full" href="/AboutUs">About us</a>
            </div>
            <div className="flex justify-end w-[100%] text-white mr-40 font-medium text-center">
                <button className="w-24 h-10 bg-yellow-400 transition-all hover:bg-yellow-500 focus:outline-none rounded-full me-2">Sign up</button>
                <button className="w-24 h-10 bg-yellow-400 transition-all hover:bg-yellow-500 focus:outline-none rounded-full me-2">Sign in</button>
            </div>
        </header>
    )
}