import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BsMap, BsBuilding } from 'react-icons/bs';
import { BiMoney, BiHotel, BiStar } from 'react-icons/bi';
import { fetchMyHotels } from '../api/api-client';

const MyHotelsPage = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    fetchMyHotels,
    {
      onError: (err: Error) => {
        console.error(err);
      },
    }
  );

  if (!hotelData) {
    return (
      <span>No hotels found...</span>
    );
  };

  return (
    <section className='space-y-5'>
      <span className='flex justify-between'>
        <h2 className='text-3xl font-bold'>
          My Hotels
        </h2>

        <Link
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold px-2 py-4 hover:bg-blue-500 rounded-md'
        >
          Add Hotel
        </Link>
      </span>

      <div className='grid grid-cols-1 gap-8'>
        {hotelData?.map((hotel) => (
          <div className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
            <h2>{hotel.name}</h2>

            <div className='whitespace-pre-line'>
              {hotel.description}
            </div>

            <div className='grid grid-cols-5 gap-2'>
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
                <span>
                  {hotel.adultCount} adults,
                  {hotel.childCount} children
                </span>
              </div>

              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BiStar className='mr-1' />
                <span>{hotel.starRating} Star Rating</span>
              </div>
            </div>

            <span className='flex justify-end'>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className='flex bg-blue-600 text-white text-xl font-bold px-2 py-4 hover:bg-blue-500 rounded-md'
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyHotelsPage;