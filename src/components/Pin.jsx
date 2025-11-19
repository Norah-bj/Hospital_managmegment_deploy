import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";

// Pin-shaped SVG icon with exact hex color, similar to Leaflet default pin
function makePinIcon(hexColor) {
  const width = 24; // px
  const height = 36; // px
  const html = `
    <svg width="${width}" height="${height}" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg" style="display:block;filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));">
      <path d="M12 0C5.925 0 1 4.925 1 11c0 7.25 9.3 23 11 23s11-15.75 11-23C23 4.925 18.075 0 12 0z" fill="${hexColor}" stroke="#ffffff" stroke-width="1.6"/>
      <circle cx="12" cy="11" r="4.2" fill="#ffffff"/>
    </svg>`;
  return L.divIcon({
    className: "custom-marker-pin",
    html,
    iconSize: [width, height],
    iconAnchor: [width / 2, height - 2],
    popupAnchor: [0, -height + 10],
  });
}

function statusToColor(type, status) {
  const s = (status || "").toString().toLowerCase();
  if (type === "emergency") {
    if (s.includes("critical")) return "#ef4444"; // red-500
    if (s.includes("urgent")) return "#f97316";   // orange-500
    if (s.includes("moderate")) return "#facc15"; // yellow-400
    if (s.includes("available")) return "#22c55e"; // green-500
    if (s.includes("transit") || s.includes("route")) return "#3b82f6"; // blue-500 fallback
    return "#3b82f6";
  }
  // ambulance legend colors
  if (s.includes("online") || s.includes("available")) return "#001240"; // dark navy
  if (s.includes("route") || s.includes("transit") || s.includes("en route")) return "#91b3ff"; // en route
  if (s.includes("maintenance")) return "#d1dfff"; // maintenance
  if (s.includes("offline")) return "#cccccc"; // offline
  return "#3b82f6";
}

function getPosition(item) {
  if (!item) return null;
  if (Array.isArray(item.position) && item.position.length === 2) return item.position;
  if (typeof item.lat === "number" && typeof item.lng === "number") return [item.lat, item.lng];
  if (typeof item.latitude === "number" && typeof item.longitude === "number") return [item.latitude, item.longitude];
  return null;
}

export default function Pin({ item }) {
  const pos = getPosition(item);
  if (!pos) return null;
  const image = item.image || item.images;
  const type = item.type || (item.alert_id ? "emergency" : "ambulance");
  const color = statusToColor(type, item.status || item.popup);
  const icon = makePinIcon(color);

  const Title = () => (
    item.id && item.title ? (
      <Link to={`/${item.id}`} className="block font-semibold text-sm text-[#001240] hover:underline">
        {item.title}
      </Link>
    ) : (
      <div className="font-semibold text-sm text-[#001240]">{item.title || item.name || "Location"}</div>
    )
  );

  // Context-aware details
  const Details = () => {
    if (type === "emergency") {
      return (
        <div className="text-xs text-gray-700 space-y-0.5">
          {item.alert_id && <div>Alert ID: <b>{item.alert_id}</b></div>}
          {item.caller_name && <div>Caller: {item.caller_name}</div>}
          {item.phone_number && <div>Phone: {item.phone_number}</div>}
          {item.location && <div>Location: {item.location}</div>}
          {(item.status || item.popup) && (
            <div className="inline-flex items-center gap-1 mt-1">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-[11px]">{item.status || item.popup}</span>
            </div>
          )}
        </div>
      );
    }
    // ambulance
    return (
      <div className="text-xs text-gray-700 space-y-0.5">
        {item.plateNumber && <div>Plate: <b>{item.plateNumber}</b></div>}
        {item.driver && <div>Driver: {item.driver}</div>}
        {item.currentLocation && <div>Location: {item.currentLocation}</div>}
        {(item.status || item.popup) && (
          <div className="inline-flex items-center gap-1 mt-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[11px]">{item.status || item.popup}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Marker position={pos} icon={icon}>
      <Popup>
        <div className="flex gap-3 items-start min-w-[220px] max-w-[260px]">
          {image && (
            <img src={Array.isArray(image) ? image[0] : image} alt="" className="w-[72px] h-[72px] object-cover rounded" />
          )}
          <div className="flex-1">
            <Title />
            <Details />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
