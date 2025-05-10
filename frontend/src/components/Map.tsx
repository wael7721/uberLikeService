import React from "react";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
interface Location{
  lat:number;
  lng:number;
}
interface MapProps{
  location?:Location;
  style?:React.CSSProperties;
}
const defaultCenter:Location = {
  lat: 36.84490,
  lng: 10.27015
}

export default function Map(props:MapProps){
  const {location=defaultCenter,style}=props

  const mapRef = React.useRef<HTMLDivElement>(null); 

  React.useEffect(() => {
    const map = new maptilersdk.Map({
      container: mapRef.current!,
      style: maptilersdk.MapStyle.STREETS,
      center:[location.lng,location.lat],
      zoom: 15.5,
      attributionControl: false
    });
    
    map.on("move",()=>{
      console.log(map.getCenter(),map.getZoom())
    })
    return () => map.remove();
  }, [location])
  

  return <div style={style} ref={mapRef} className="w-full h-screen"/>
}