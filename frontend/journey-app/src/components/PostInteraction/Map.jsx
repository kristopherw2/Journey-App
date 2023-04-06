import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const geotagIcon = new L.Icon({
  iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = ({ lat, lng }) => {
  const position = [lat, lng];

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={geotagIcon}>
          <Popup>
            Latitude: {lat}, Longitude: {lng}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
