import type { SearchParams } from '../types/searchParams';
import type { HotelSearchResponse } from '../types/hotelSearchResponse';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');

  const response = await fetch(`${API_BASE_URL}/hotels/search?${queryParams}`);

  if (!response.ok) {
    throw new Error('Error fetching hotels');
  };

  return response.json();
};