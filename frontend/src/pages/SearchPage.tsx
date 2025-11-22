import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import { searchHotels } from '../api/hotelClient';

const SearchPage = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery(
    ['searchHotels', searchParams],
    () => searchHotels(searchParams)
  );
  console.log(hotelData);

  return (
    <div>SearchPage</div>
  );
};

export default SearchPage;