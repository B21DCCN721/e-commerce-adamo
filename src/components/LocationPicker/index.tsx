/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LocationPickerProps {
  onSelect: (lat: number, lng: number) => void;
  defaultPosition?: [number, number];
}


const LocationPicker: React.FC<LocationPickerProps> = ({ onSelect, defaultPosition }) => {
  const [position, setPosition] = useState<[number, number]>(
    defaultPosition || [21.0285, 105.8542] // Hà Nội mặc định
  );

  const LocationEvents = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onSelect(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} />
      <LocationEvents />
    </MapContainer>
  );
};

export default LocationPicker;
