import Map from "./Map";
import { useEffect,useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function MapShowcase(){
    const destinations = [
{ name: "Medina of Tunis", lat: 36.8028, lng: 10.1658 },
{ name: "Bardo Museum", lat: 36.8098, lng: 10.1342 },
{ name: "El Djem", lat: 35.2968, lng: 10.7069 },
{ name: "Dougga", lat: 36.4230, lng: 9.2206 },
{ name: "Kairouan", lat: 35.6781, lng: 10.0963 },
{ name: "Tozeur", lat: 33.9197, lng: 8.1335 },
{ name: "Djerba", lat: 33.8076, lng: 10.8451 },
{ name: "Sousse", lat: 35.8256, lng: 10.6084 },
{ name: "Hammamet", lat: 36.4008, lng: 10.6222 },
{ name: "Carthage Ruins", lat: 36.8581, lng: 10.3308 },
];
    const [index, setIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % destinations.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const current = destinations[index];

    return(
    <div className="flex flex-row w-full items-start justify-between h-[94vh] pl-12 pb-12">
      <div className="flex flex-col h-full justify-center items-start">
        <h1 className="font-sans text-9xl">Where to today?<br/>
        <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="text-blue-600 mt-4"
            >
              {current.name}
            </motion.div>
          </AnimatePresence></h1>
      </div>
      <Map location={{ lat: current.lat, lng: current.lng }} style={{alignItems:'start',justifyContent:"end", width:"40%",height:"94vh"}}/>
    </div>)
}