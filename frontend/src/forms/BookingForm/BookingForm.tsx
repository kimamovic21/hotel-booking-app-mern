import { useForm } from 'react-hook-form';
import {
  useElements,
  useStripe,
  CardElement,
} from '@stripe/react-stripe-js';
import type { UserType } from '../../types/userType';
import type { BookingFormData } from '../../types/bookingFormData';
import type { PaymentIntentResponse } from '../../types/paymentIntentResponse';
import type { StripeCardElement } from '@stripe/stripe-js';

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

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
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

    };
  };

  return (
    <form className='grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5'>
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
    </form>
  );
};

export default BookingForm;