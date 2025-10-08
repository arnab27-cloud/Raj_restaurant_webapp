import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Modal from '@mui/material/Modal';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '400px' };
const defaultCenter = { lat: 22.5726, lng: 88.3639 }; // Kolkata

export default function AddressPickerModal({
  open,
  onClose,
  onSelectAddress,
  selectedAddress,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [inputValue, setInputValue] = useState(selectedAddress || '');
  const autocompleteRef = React.useRef(null);

  useEffect(() => {
    if (selectedAddress && window.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: selectedAddress }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const latLng = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMapCenter(latLng);
          setMarker(latLng);
        }
      });
    }
  }, [selectedAddress]);

  const handleMapClick = useCallback(
    (event) => {
      const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(latLng);
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          onSelectAddress(results[0].formatted_address);
          setInputValue(results[0].formatted_address);
          onClose();
        }
      });
    },
    [onClose, onSelectAddress]
  );

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place?.geometry?.location && place?.formatted_address) {
      const location = place.geometry.location;
      const latLng = {
        lat: location.lat(),
        lng: location.lng(),
      };
      setMarker(latLng);
      setMapCenter(latLng);
      onSelectAddress(place.formatted_address);
      setInputValue(place.formatted_address);
      onClose();
    }
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: 20, background: 'white', margin: '5% auto', maxWidth: 800 }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search your address"
            style={{
              marginBottom: '12px',
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxShadow: '0 0 0 1px #ccc',
            }}
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={mapCenter}
          onClick={handleMapClick}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>
    </Modal>
  );
}