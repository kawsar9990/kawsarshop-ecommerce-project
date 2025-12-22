'use client'


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const markerIcon = new L.Icon({
iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
iconSize: [25, 41],
iconAnchor: [12, 41],
});

export default function Maps(){
    return(
<div className='rounded-xl p-5 z-0' style={{ height: "500px", width: "100%", borderRadius: "10px", zIndex: "0",userSelect: "none"}}>
<MapContainer
center={[24.105098690537357, 90.10544295514084]}
zoom={10}
scrollWheelZoom={false}
className="h-full w-full"
>
<TileLayer
attribution='&copy; OpenStreetMap'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
<Marker position={[24.105098690537357, 90.10544295514084]} icon={markerIcon}>
<Popup>
<strong>📍 KawsarShop Location</strong>
<br /> Dhaka, Bangladesh
</Popup>
</Marker>
</MapContainer>
</div>       
    )
}