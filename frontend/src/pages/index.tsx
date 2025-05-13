import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import MapShowcase from "@/components/MapShowcase";
export default function Home (){
  return (
    <div>
      <NavBar/>
      <main className="flex flex-col items-center justify-center w-full">
        <MapShowcase/>
      </main>
      <Footer/>
    </div>
  )
  
}