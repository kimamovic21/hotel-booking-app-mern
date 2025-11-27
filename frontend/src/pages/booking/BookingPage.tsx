import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { useSearchContext } from '../../contexts/SearchContext';
import { fetchCurrentUser } from '../../api/authClient';
import { createPaymentIntent, fetchHotelById } from '../../api/hotelClient';
import { useAppContext } from '../../contexts/AppContext';
import type { UserType } from '../../types/userType';
import BookingForm from '../../forms/BookingForm/BookingForm';
import BookingDetailsSummary from './BookingDetailsSummary';

const BookingsPage = () => {
  const search = useSearchContext();

  const { stripePromise } = useAppContext();

  const { hotelId } = useParams();

  const { data: hotel, isLoading: hotelIsLoading } = useQuery(
    'fetchHotelById',
    () => fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId
    },
  );

  const { data: currentUser } = useQuery<UserType>(
    'fetchCurrentUser',
    fetchCurrentUser
  );

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const { data: paymentIntentData } = useQuery(
    'createPaymentIntent',
    () => createPaymentIntent(hotelId as string, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
    },
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const totalNumberOfNights =
        (Math.abs(search.checkOut.getTime() - search.checkIn.getTime())) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(totalNumberOfNights));
    };
  }, [search.checkIn, search.checkOut]);


  if (hotelIsLoading) return <span>Loading...</span>;

  if (!hotel) return <span>No hotel found...</span>;

  return (
    <section className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </section>
  );
};

export default BookingsPage;