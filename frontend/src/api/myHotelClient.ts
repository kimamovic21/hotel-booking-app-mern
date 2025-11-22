import type { HotelType } from '../types/hotelType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addMyHotel = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error('Failed to add hotel!');
  };

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching hotels!');
  };

  return response.json();
};

export const fetchMyHotelById = async (
  hotelId: string
): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${hotelId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching hotel!');
  };

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      body: hotelFormData,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update hotel!');
  };

  return response.json();
};