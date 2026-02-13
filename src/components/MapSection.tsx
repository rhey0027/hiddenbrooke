import dynamic from "next/dynamic";
import { MapPin, Navigation, Car, Compass } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Dynamically import the map with no SSR
const MapDisplay = dynamic(() => import("./MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="h-125 w-full bg-linear-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-6"></div>
        <p className="text-gray-800 font-semibold text-lg">
          Loading Hiddenbrooke Resort Map...
        </p>
        <p className="text-gray-600 mt-2">
          Showing you the way to HiddenBrooke Resort
        </p>
      </div>
    </div>
  ),
});

export default function MapSection() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  });

  return (
    <section className="py-20 px-4 bg-linear-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full mb-6"
            data-aos="fade-up"
          >
            <Compass className="w-5 h-5" />
            <span className="font-semibold">Directions to Hiddenbrooke</span>
          </div>

          <h1
            className="font-[Style_Script] tracking-wider text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
          >
            Find Your Way to{" "}
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-blue-600"
              data-aos="fade-up"
            >
              Paradise
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
          >
            Nestled in the heart of nature, HiddenBrooke Resort is easily
            accessible yet feels worlds away from the hustle and bustle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Getting Here Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2
                className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
                data-aos="fade-up"
              >
                <Navigation className="w-8 h-8 text-blue-600" />
                Getting Here
              </h2>

              <div className="space-y-6">
                <div
                  className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl"
                  data-aos="fade-up"
                >
                  <Car className="w-8 h-8 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      From City Proper
                    </h3>
                    <p className="text-gray-700">
                      Take MCLL Highway westcoast after Barangay Sangali before
                      Bolong, take left turn.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl"
                  data-aos="fade-up"
                >
                  <Navigation className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Nearest Airport
                    </h3>
                    <p className="text-gray-700">
                      25 minutes drive from HiddenBrooke Resort. We offer
                      airport pickup service.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl"
                  data-aos="fade-up"
                >
                  <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      Coordinates
                    </h3>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="font-mono text-gray-800">
                        7.118342651506422° N
                      </p>
                      <p className="font-mono text-gray-800">
                        122.17810723678386° W
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resort Address */}
            <div className="bg-linear-to-br from-emerald-500 to-blue-500 text-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
                Resort Address
              </h2>
              <div className="space-y-4 text-lg" data-aos="fade-up">
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Upper Bunguiao</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">🏘️</span>
                  <span>Waray-Waray</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">🏙️</span>
                  <span>Zamboanga City</span>
                </p>
              </div>

              <div
                className="mt-8 pt-8 border-t border-white/30"
                data-aos="fade-up"
              >
                <p className="text-lg italic">
                  &quot;Mountain spring water, delivered by nature to your
                  poolside sanctuary.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-1">
            <div className="sticky top-8" data-aos="fade-up">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="p-6 bg-linear-to-r from-emerald-600 to-blue-600 text-white">
                  <h3 className="text-2xl font-bold mb-2">Live Location Map</h3>
                  <p className="opacity-90 font-light text-sm">
                    Interactive map showing{" "}
                    <span className="font-semibold">Hiddenbrooke Resort</span>{" "}
                    exact location
                  </p>
                </div>
                <div className="p-2">
                  <MapDisplay />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span>Hiddenbrooke Marker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Zoom & Drag Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3
            className="text-2xl font-bold text-gray-900 mb-6 text-center"
            data-aos="fade-up"
          >
            Area Map
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="text-center p-6 bg-linear-to-br from-blue-50 to-white rounded-xl border border-blue-100"
              data-aos="fade-up"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">Bunguiao</h4>
              <p className="text-gray-600">Local Community Area</p>
            </div>

            <div
              className="text-center p-6 bg-linear-to-br from-emerald-50 to-white rounded-xl border border-emerald-100"
              data-aos="fade-up"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏘️</span>
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                Waray-Waray
              </h4>
              <p className="text-gray-600"> Where the resort is nestled</p>
            </div>

            <div
              className="text-center p-6 bg-linear-to-br from-amber-50 to-white rounded-xl border border-amber-100"
              data-aos="fade-up"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏙️</span>
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                Zamboanga City
              </h4>
              <p className="text-gray-600">Nearest major city</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <div className="inline-block bg-linear-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-lg">
            <p className="text-md font-semibold">
              Need turn-by-turn directions?
            </p>
            <p className="opacity-90">Tawag or Text na sa 0975-856-9236</p>
          </div>
        </div>
      </div>
    </section>
  );
}
