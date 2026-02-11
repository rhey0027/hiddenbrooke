"use client";

import { useLayoutEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapDisplay() {
  const [isMounted, setIsMounted] = useState(false);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  useLayoutEffect(() => {
    // Fix leaflet default icons
    if (typeof window !== "undefined") {
      // Fix for default marker icons
      // @ts-expect-error hdsldslsldsldsjl
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Create CUSTOM icon for HiddenBrooke Resort
      const customMarkerIcon = new L.Icon({
        iconUrl: "/logo/brooke.png", // Your custom marker
        iconSize: [50, 50], // Adjust based on your image size
        iconAnchor: [25, 20], // Point of the icon that corresponds to marker's location
        popupAnchor: [0, -50], // Where popup opens relative to the icon
        className: "custom-marker-icon",
      });

      const timer = setTimeout(() => {
        setCustomIcon(customMarkerIcon);
        setIsMounted(true);
      }, 3);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // HiddenBrooke Resort coordinates
  const resortLocation: [number, number] = [
    7.118342651506422, 122.17810723678386,
  ];

  if (!isMounted) {
    return (
      <div className="h-125 w-full bg-linear-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">
            Loading HiddenBrooke Resort Map...
          </p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={resortLocation}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      className="rounded-2xl shadow-2xl z-0"
      scrollWheelZoom={true}
      zoomControl={true}
      dragging={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={resortLocation}
        icon={
          customIcon ||
          L.icon({
            iconUrl: "/logo/brooke.png",
            iconSize: [180, 180],
            iconAnchor: [25, 50],
          })
        }
      >
        <Popup className="custom-popup">
          <div className="p-4 text-center min-w-65">
            <div className="mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🏝️</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800">
                HiddenBrooke Resort
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Your Tropical Paradise
              </p>
            </div>

            <div className="space-y-2 text-left">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">📍</span>
                <div>
                  <p className="font-medium text-gray-800">Coordinates:</p>
                  <p className="text-sm text-gray-600">
                    7.118342° N, 122.178107° W
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✈️</span>
                <div>
                  <p className="font-medium text-gray-800">Nearest Airport:</p>
                  <p className="text-sm text-gray-600">25 minutes drive</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">🏠</span>
                <div>
                  <p className="font-medium text-gray-800">Address:</p>
                  <p className="text-sm text-gray-600">
                    Upper Bunguiao, Waray-Waray, Zamboanga City
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 italic">
                &quot;Nestled in the heart of nature, easily accessible yet
                feels worlds away&quot;
              </p>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
