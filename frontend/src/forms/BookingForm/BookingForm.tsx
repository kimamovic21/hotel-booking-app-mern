import { useForm } from 'react-hook-form';
import type { UserType } from '../../types/userType';
import type { BookingFormData } from '../../types/bookingFormData';

type BookingFormProps = {
  currentUser: UserType
};

const BookingForm = ({ currentUser }: BookingFormProps) => {
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

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
    </form>
  );
};

export default BookingForm;