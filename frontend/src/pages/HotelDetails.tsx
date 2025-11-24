import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AiFillStar } from 'react-icons/ai';
import { fetchHotelById } from '../api/hotelClient';
import type { HotelType } from '../types/hotelType';

const HotelDetails = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery<HotelType>(
    'fetchHotelById',
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return (
      <span>No hotel found...</span>
    );
  };

  return (
    <section className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className='fill-yellow-400' />
          ))}
        </span>

        <h2 className='text-3xl font-bold'>{hotel.name}</h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.imageUrls.map((imageUrl) => (
          <div className='h-[300px]'>
            <img
              src={imageUrl}
              alt={hotel.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility) => (
          <div className='border border-slate-300 rounded-sm p-4'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>
          {hotel.description}
        </div>

        <div className='h-fit'>
          
        </div>
      </div>
    </section>
  );
};

export default HotelDetails;