import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Pin from "./Pin" 

function Map({ items = [], center = [51.505, -0.09], zoom = 6, className = "w-full h-[400px] rounded-[3px] overflow-hidden" }) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className={className}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(items) && items.map((item) => (
            <Pin key={item.id ?? `${item.lat}-${item.lng}`} item={item}/>
        ))}
    </MapContainer>
  )
}

export default Map