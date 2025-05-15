import NavBar from "@/components/NavBar";
import SignUpPage from "@/components/SignUpPage";

export default function SignUp(){
    return <div className="flex flex-col gap-10 items-center min-h-screen w-full bg-white"><NavBar></NavBar><SignUpPage/></div>
}