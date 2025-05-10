import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
export default function Home (){
  return (
  <div>
    <NavBar/>
    <main className="flex flex-column items-center justify-center w-full h-screen">
    <Map style={{borderRadius:10,width:400,height:400}}/>
    </main>
    <Footer/>
  </div>)
  
}