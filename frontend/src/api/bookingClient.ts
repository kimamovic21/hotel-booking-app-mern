import type { HotelType } from '../types/hotelType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/my-bookings`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch bookings!');
  };

  return response.json();
};