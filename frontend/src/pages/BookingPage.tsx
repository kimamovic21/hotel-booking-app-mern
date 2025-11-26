import { useQuery } from 'react-query';
import { fetchCurrentUser } from '../api/authClient';
import type { UserType } from '../types/userType';
import BookingForm from '../forms/BookingForm/BookingForm';

const BookingsPage = () => {
  const { data: currentUser } = useQuery<UserType>(
    'fetchCurrentUser',
    fetchCurrentUser
  );

  console.log(currentUser?.email);

  return (
    <section className='grid md:grid-cols-[1fr_2fr]'>
      <div>
        Booking Details Summary
      </div>

      {currentUser && (
        <BookingForm currentUser={currentUser} />
      )}
    </section>
  );
};

export default BookingsPage;