import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Bell, Navigation, List, Map as MapIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import supabase from "../lib/supabase";

// Fix Leaflet default marker icons broken by bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const storeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Screen = "home" | "basket" | "recipe" | "dietary" | "social" | "price-history" | "notifications" | "profile" | "edit-profile" | "general-settings" | "privacy-security" | "help-center" | "contact-support" | "faq" | "terms" | "privacy-policy" | "how-pantry-works" | "map";

interface StoreMapProps {
  onNavigate: (screen: Screen) => void;
}

// helper: offset a lat/lng by (dx, dy) miles
function offsetCoords(lat: number, lng: number, dxMiles: number, dyMiles: number) {
  return {
    lat: lat + dyMiles / 69.0,
    lng: lng + dxMiles / (69.0 * Math.cos((lat * Math.PI) / 180)),
  };
}

// haversine distance in miles
function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Recenter map helper
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], 13); }, [lat, lng, map]);
  return null;
}

export function StoreMap({ onNavigate }: StoreMapProps) {
  const [view, setView] = useState<"map" | "list">("map");
  const [storesData, setStoresData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number }>({ lat: 51.5072, lng: -0.1276 });
  const [radiusMiles, setRadiusMiles] = useState(2);
  const [activeChain, setActiveChain] = useState("All Stores");
  const radiusMetres = radiusMiles * 1609.34;

  // Ask for geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data, error } = await supabase.from("stores").select("*");
        if (data) {
          // Offsets for up to 10 stores — spread 1-4 miles in different directions
          const offsets = [
            { dx: 0.8,  dy: 0.6  },
            { dx: -1.3, dy: 0.5  },
            { dx: 0.5,  dy: -1.6 },
            { dx: -0.9, dy: -1.3 },
            { dx: 2.1,  dy: -0.6 },
            { dx: -1.9, dy: 1.3  },
            { dx: 1.3,  dy: 2.1  },
            { dx: -1.1, dy: -2.6 },
            { dx: 3.0,  dy: 0.9  },
            { dx: -2.6, dy: -0.9 },
          ];

          const mapped = data.map((s: any, i: number) => {
            let storeLat: number, storeLng: number;
            if (s.lat && s.lng) {
              storeLat = Number(s.lat);
              storeLng = Number(s.lng);
            } else {
              const off = offsets[i % offsets.length];
              const pos = offsetCoords(userPos.lat, userPos.lng, off.dx, off.dy);
              storeLat = pos.lat;
              storeLng = pos.lng;
            }
            const distance = haversineMiles(userPos.lat, userPos.lng, storeLat, storeLng);
            return {
              id: s.id,
              name: s.name,
              domain: s.domain,
              emoji: s.emoji || "??",
              color: s.color,
              address: s.address || "Location unavailable",
              openUntil: s.open_until || "Check in store",
              hasLoyalty: s.has_loyalty || false,
              loyaltyName: s.loyalty_name || "",
              lat: storeLat,
              lng: storeLng,
              distance: Math.round(distance * 10) / 10,
            };
          }).sort((a: any, b: any) => a.distance - b.distance);

          setStoresData(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [userPos]);

  const getLogoUrl = (domain: string, name: string) => {
    if (name?.toLowerCase().includes("sainsbury"))
      return "https://cdn.brandfetch.io/id3jwaSrnD/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1685968241221";
    return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : "";
  };

  const visibleStores = storesData.filter((s) => s.distance <= radiusMiles);
  const filteredStores = activeChain === "All Stores"
    ? visibleStores
    : visibleStores.filter((s) => s.name.toLowerCase().includes(activeChain.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#4CAF50] p-6 pb-8">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => onNavigate("home")}>
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white">Nearby Stores</h1>
          <button onClick={() => onNavigate("notifications")}>
            <Bell className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* View Toggle */}
        <div className="mb-4 bg-white rounded-xl shadow-sm p-2 flex gap-2">
          <button
            onClick={() => setView("map")}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${view === "map" ? "bg-[#4CAF50] text-white" : "text-gray-500"}`}
          >
            <MapIcon className="w-5 h-5" />
            <span>Map</span>
          </button>
          <button
            onClick={() => setView("list")}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${view === "list" ? "bg-[#4CAF50] text-white" : "text-gray-500"}`}
          >
            <List className="w-5 h-5" />
            <span>List</span>
          </button>
        </div>

        {/* Radius slider � always visible */}
        <div className="mb-4 bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 text-sm">Search radius</span>
            <span className="bg-[#4CAF50] text-white text-sm px-3 py-1 rounded-full">{radiusMiles} mi</span>
          </div>
          <input
            type="range" min={0.5} max={10} step={0.5}
            value={radiusMiles}
            onChange={(e) => setRadiusMiles(Number(e.target.value))}
            className="w-full accent-[#4CAF50]"
          />
          <p className="text-gray-500 text-xs mt-1">{visibleStores.length} store{visibleStores.length !== 1 ? "s" : ""} within {radiusMiles} mile{radiusMiles !== 1 ? "s" : ""}</p>
        </div>

        {/* Map View */}
        {view === "map" && (
          <div className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: "380px" }}>
            <MapContainer
              center={[userPos.lat, userPos.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
            >
              <RecenterMap lat={userPos.lat} lng={userPos.lng} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Radius circle */}
              <Circle
                center={[userPos.lat, userPos.lng]}
                radius={radiusMetres}
                pathOptions={{ color: "#4CAF50", fillColor: "#4CAF50", fillOpacity: 0.08, weight: 2 }}
              />
              {/* User location */}
              <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
                <Popup>
                  <strong>Your location</strong>
                </Popup>
              </Marker>
              {/* Store pins — only inside radius, filtered by chain */}
              {filteredStores.map((store) => (
                <Marker key={store.id} position={[store.lat, store.lng]} icon={storeIcon}>
                  <Tooltip permanent direction="bottom" offset={[0, 8]} className="store-pin-label">
                    <span style={{fontSize:"11px",fontWeight:600,whiteSpace:"nowrap"}}>{store.name} · {store.distance}mi</span>
                  </Tooltip>
                  <Popup>
                    <div style={{fontSize:"13px",lineHeight:"1.6"}}>
                      <strong>{store.name}</strong><br />
                      {store.distance} mi away<br />
                      {store.address !== "Location unavailable" && <>{store.address}<br /></>}
                      {store.hasLoyalty && <>Card: {store.loyaltyName}</>}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="mb-4">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {visibleStores.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center text-gray-400">
                    No {activeChain === "All Stores" ? "" : activeChain + " "}stores within {radiusMiles} miles. Try increasing the radius.
                  </div>
                ) : filteredStores.map((store) => (
                  <div key={store.id} className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shrink-0 text-2xl">
                        <img
                          src={getLogoUrl(store.domain, store.name)}
                          alt={store.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement!.innerText = store.emoji; }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-gray-800">{store.name}</h4>
                          <span className="bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm ml-2 shrink-0">{store.distance} mi</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">{store.address}</p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-600">Open until {store.openUntil}</span>
                          {store.hasLoyalty && <span className="text-purple-600">Card: {store.loyaltyName}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Closest store banner */}
        {storesData.length > 0 && (
          <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-xl shadow-md p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Closest Store</p>
                <h3 className="text-white">{storesData[0].name}</h3>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm mb-1">Distance</p>
                <p className="text-white text-2xl">{storesData[0].distance} mi</p>
              </div>
            </div>
          </div>
        )}

        {/* Chain filter chips */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {["All Stores", "Tesco", "Sainsbury's", "Aldi", "Lidl", "Morrisons"].map((name) => (
              <button
                key={name}
                onClick={() => setActiveChain(name)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeChain === name
                    ? "bg-[#4CAF50] text-white"
                    : "bg-white text-gray-700 border border-gray-200 active:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
