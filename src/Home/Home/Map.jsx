import { useState } from "react";
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer , Marker , Popup} from "react-leaflet";

const MapComponent = () => {
    const [center] = useState({ lat: 23.685, lng: 90.3563 }); // Centered on Dhaka, Bangladesh
    const ZOOM_LEVEL = 7; // Zoom level to view Bangladesh

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-center text-2xl font-bold font-Briem my-9">Find Us Here</h2>
            <div className="map-container rounded-lg overflow-hidden">
                <MapContainer center={center} zoom={ZOOM_LEVEL} style={{ height: "400px", width: "100%" }}>
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <Marker position={[23.685, 90.3563]}>
                    <Popup>
                        Dhaka, Bangladesh
                    </Popup>
                </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default MapComponent;
