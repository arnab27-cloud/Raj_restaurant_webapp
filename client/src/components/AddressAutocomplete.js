import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { useRef } from 'react';

const libraries = ['places'];

export default function AddressAutocomplete({ value, onChange }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    const address = place?.formatted_address;
    if (address) {
      onChange(address);
      localStorage.setItem('deliveryAddress', address);
    }
  };

  if (loadError) {
    console.error('Google Maps failed to load:', loadError);
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your address"
        style={inputStyles}
      />
    );
  }

  if (!isLoaded) return null;

  return (
    <Autocomplete
      onLoad={(auto) => {
        autocompleteRef.current = auto;
      }}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your address"
        style={inputStyles}
      />
    </Autocomplete>
  );
}

const inputStyles = {
  marginBottom: '12px',
  maxWidth: '480px',
  background: '#fff',
  padding: '8px',
  borderRadius: '6px',
  boxShadow: '0 0 0 1px #ccc',
  border: '1px solid #ccc',
};