import React from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { error } from "console";
interface Location {
  lat: number;
  lng: number;
}
interface MapProps {
  location?: Location;
  style?: React.CSSProperties;
}
const defaultCenter: Location = {
  lat: 36.8449,
  lng: 10.27015,
};

export default function Map(props: MapProps) {
  const { location = defaultCenter, style } = props;

  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<maptilersdk.Map | null>(null);

  if (!process.env.NEXT_PUBLIC_MAPTILERAPI) {
    throw new Error("Missing MAPTILERAPI environment variable");
  }

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILERAPI;

  React.useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = new maptilersdk.Map({
      container: mapRef.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [location.lng, location.lat],
      zoom: 14,
      attributionControl: false,
    });
    mapInstance.current=map
    return () => map.remove();
  },[]);

  React.useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 14,
        speed: 1,
        curve: 1,
        easing: (t)=> 1 - Math.pow(1 - t, 1.6),
      });
    }
  }, [location]);

  return <div style={style} ref={mapRef} />;
}
