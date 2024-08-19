import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import ListUsers from '../components/ListUsers';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import Footer from '@/components/Footer';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const Home = () => {
  const [L, setL] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);
  const [locations, setLocations] = useState([]); // State to store the converted lat/lng locations

  useEffect(() => {
    // Import Leaflet and setup custom icon only in the client-side environment
    import('leaflet').then((L) => {
      setL(L);
      const icon = new L.Icon({
        iconUrl: '/pin.png',  // Path to your custom icon in the public folder
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setCustomIcon(icon);
    });

    // Fetch addresses and convert to lat/lng
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_BACKEND_API_URL}/addresses`, {
          headers: {
            'x-frontend-id': 'project-red'
          }
        });
        const addresses = response.data.addresses;

        const locationPromises = addresses.map(async (address) => {
          const geocodeResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
              q: address,
              key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY, // Use your OpenCage API key here
            }
          });
          const { lat, lng } = geocodeResponse.data.results[0].geometry;
          return { lat, lng, name: address };
        });

        const convertedLocations = await Promise.all(locationPromises);
        setLocations(convertedLocations);
      } catch (error) {
        console.error("Error fetching or converting addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  if (!L || !customIcon) {
    return <div>Loading map...</div>; // Render a loading state while Leaflet is being loaded
  }

  return (
<div>
  {/* Map Container */}
  <div className="p-8 min-h-screen relative z-10">
    <div className="h-128 w-full border border-gray-300 mt-32 z-10">
      <MapContainer 
        center={[20, 0]} 
        zoom={2}
        className="h-full w-full z-0"
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        dragging={false}
        trackResize={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    <ListUsers />
  </div>
  <Footer />
</div>

  );
};

export default Home;
