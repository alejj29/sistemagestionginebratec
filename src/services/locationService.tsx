import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reverse-geocode';

export const getAddressFromCoords = async (lat: number, lon: number) => {
  try {
    const response = await axios.post(API_URL, { lat, lon });
    return response.data;
  } catch (error: any) {
    console.error('Error obteniendo dirección:', error.message);
    throw error;
  }
};
