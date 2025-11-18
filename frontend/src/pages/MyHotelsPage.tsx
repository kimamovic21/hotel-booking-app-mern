import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BsMap, BsBuilding } from 'react-icons/bs';
import { BiMoney, BiHotel, BiStar } from 'react-icons/bi';
import { fetchMyHotels } from '../api/api-client';
import type { HotelType } from '../types/hotelType';

const MyHotelsPage = () => {
  const { data: hotelData } = useQuery<HotelType[]>(
    'fetchMyHotels',
    fetchMyHotels,
    {
      onError: (err: unknown) => console.error(err),
    }
  );

  return (
    <section className='space-y-5'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold'>My Hotels</h2>
        <Link
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold px-4 py-2 hover:bg-blue-500 rounded-md'
        >
          Add Hotel
        </Link>
      </div>

      {!hotelData || hotelData.length === 0 ? (
        <div className='p-8 border border-slate-300 rounded-lg text-center text-gray-500'>
          No hotels found. Click 'Add Hotel' to create your first one!
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-8'>
          {hotelData.map((hotel) => (
            <div
              key={hotel._id}
              data-testid='hotel-card'
              className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'
            >
              <h2 className='text-2xl font-bold'>{hotel.name}</h2>
              <div className='whitespace-pre-line'>{hotel.description}</div>

              <div className='grid grid-cols-5 gap-2 mt-4'>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BsMap className='mr-1' />
                  <span>{hotel.city}, {hotel.country}</span>
                </div>

                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BsBuilding className='mr-1' />
                  <span>{hotel.type}</span>
                </div>

                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BiMoney className='mr-1' />
                  <span>${hotel.pricePerNight} per night</span>
                </div>

                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BiHotel className='mr-1' />
                  <span>{hotel.adultCount} adults, {hotel.childCount} children</span>
                </div>

                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BiStar className='mr-1' />
                  <span>{hotel.starRating} Star Rating</span>
                </div>
              </div>

              <div className='flex justify-end mt-4'>
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className='flex bg-blue-600 text-white text-xl font-bold px-4 py-2 hover:bg-blue-500 rounded-md'
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyHotelsPage;