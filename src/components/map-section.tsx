"use client";

import Head from "next/head";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Car } from "lucide-react";
import L from "leaflet";
import customPinUrl from "../../public/images/brooke.png";

import { useEffect } from "react";
import Link from "next/link";

// Fix for default icons in Leaflet
const defaultIcon = () => {
  const proto = Icon.Default.prototype as L.Icon.Default & {
    _getIconUrl?: string;
  };
  delete proto._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  });
};
const customMarkerIcon = L.icon({
  iconUrl: (customPinUrl.src = "/images/brooke.png"), // Use .src to get the correct URL string
  iconSize: [80, 50], // [width, height] in pixels
  iconAnchor: [30, 30], // [x, y] point relative to the top-left corner that anchors the icon to the map coordinate
  popupAnchor: [0, -32], // Optional: offsets the popup attachment point
});

const MapSection = () => {
  const position: [number, number] = [7.118323780048746, 122.17810180305764]; //

  useEffect(() => {
    defaultIcon();
  }, []);

  const directions = [
    {
      icon: <Car size={20} />,
      text: "From city proper: Take MCLL Highway westcoast after Barangay Sangali before bolong take left ",
    },
    {
      icon: <Navigation size={20} />,
      text: "Nearest airport: 25 minutes drive from Hiddenbrooke Resort",
    },
    {
      icon: <MapPin size={20} />,
      text: "Coordinates: 7.118342651506422° N, 122.17810723678386° W",
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-br from-blue-50 via-white to-teal-50">
      <Head>
        <Link
          href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap"
          rel="stylesheet"
        />
        {/* <Link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
          rel="stylesheet"
        /> */}
      </Head>

      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-12`}>
          <h1 className="font-['Style_Script'] text-4xl md:text-7xl font-bold text-gray-900 mb-4 tracking-wider">
            Find Your Way to Paradise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nestled in the heart of nature, HiddenBrooke Resort is easily
            accessible yet feels worlds away
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Directions Info */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Navigation className="mr-3 text-blue-600" size={28} />
                Getting Here
              </h3>
              <div className="space-y-6">
                {directions.map((direction, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-linear-to-r from-blue-100 to-teal-100 rounded-lg">
                      {direction.icon}
                    </div>
                    <p className="text-gray-700">{direction.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Resort Address</h3>
              <p className="text-lg mb-2">Upper Bunguiao</p>
              <p className="text-lg mb-2">Waray-Waray</p>
              <p className="text-lg mb-6">Zamboanga City</p>
              <p className="text-blue-100">Open daily</p>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 z-10">
            <div className="h-125 rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customMarkerIcon}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">HiddenBrooke Resort</h3>
                      <p className="text-gray-600">Bene Ya!</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm text-gray-700">
                  Click and drag to explore the area
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
