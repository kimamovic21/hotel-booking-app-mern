import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import {
  useElements,
  useStripe,
  CardElement,
} from '@stripe/react-stripe-js';
import type { UserType } from '../../types/userType';
import type { BookingFormData } from '../../types/bookingFormData';
import type { 
  PaymentIntentResponse 
} from '../../types/paymentIntentResponse';
import type { StripeCardElement } from '@stripe/stripe-js';
import { useSearchContext } from '../../contexts/SearchContext';
import { createRoomBooking } from '../../api/hotelClient';
import { useAppContext } from '../../contexts/AppContext';

type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse
};

const BookingForm = ({
  currentUser,
  paymentIntent
}: BookingFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { showToast } = useAppContext();

  const { hotelId } = useParams();

  const { mutate: bookRoom, isLoading } = useMutation(createRoomBooking, {
    onSuccess: () => {
      showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error saving booking!', type: 'ERROR' });
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) return;

    const result = await stripe?.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as StripeCardElement
      },
    });

    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    };
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'
    >
      <span className='text-3xl font-bold'>
        Confirm Your Details
      </span>

      <div className='grid grid-cols-2 gap-6'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            type='text'
            readOnly
            disabled
            {...register('firstName')}
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
          />
        </label>

        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            type='text'
            readOnly
            disabled
            {...register('lastName')}
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
          />
        </label>

        <label className='text-gray-700 text-sm font-bold flex-1'>
          Email
          <input
            type='email'
            readOnly
            disabled
            {...register('email')}
            className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal'
          />
        </label>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Your Price Summary
        </h2>

        <div className='bg-blue-200 p-4 rounded-md'>
          <div className='font-semibold text-lg'>
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>

          <div className='text-xs'>
            Includes taxes and charges
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='text-xl font-semibold'>
          Payment Details
        </h3>

        <CardElement
          id='payment-element'
          className='border rounded-md p-2 text-sm'
        />
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md cursor-pointer disabled:bg-gray-500'
        >
          {isLoading ? 'Saving...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;