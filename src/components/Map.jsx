import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCities } from '../Contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation';
import Button from './Button';

// let latitude;
// let longitude;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//   });
// } else {
//   console.log('Geolocation is not supported by this browser.');
// }

function Map() {
  // get cities context state
  const { cities } = useCities();

  const [position, setPosition] = useState([40, 0]);

  const [searchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );

  // to change the map based on form
  useEffect(
    function () {
      if (geoLocationPosition) {
        setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={position}
        // center={[lat, lng]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji} </span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
