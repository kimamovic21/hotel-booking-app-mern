import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api-client';
import { useAppContext } from '../contexts/AppContext';
import type { RegisterFormData } from '../types/registerFormData';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      showToast({ message: 'Registration Success!', type: 'SUCCESS' });
      navigate('/');
    },
    onError: (error: Error) => {
      console.error(error.message);
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <form
      className='flex flex-col gap-5 lg:px-32'
      onSubmit={onSubmit}
    >
      <h2 className='text-3xl font-bold'>
        Create an account
      </h2>

      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          <span>First Name</span>
          <input
            type='text'
            className='border rounded-sm w-full py-1 px-2 font-normal'
            {...register('firstName', {
              required: 'This field is required!'
            })}
          />
          {errors.firstName && (
            <span className='text-red-500'>
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className='text-gray-700 text-sm font-bold flex-1'>
          <span>Last Name</span>
          <input
            type='text'
            className='border rounded-sm w-full py-1 px-2 font-normal'
            {...register('lastName', {
              required: 'This field is required!'
            })}
          />
          {errors.lastName && (
            <span className='text-red-500'>
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        <span>Email</span>
        <input
          type='email'
          className='border rounded-sm w-full py-1 px-2 font-normal'
          {...register('email', {
            required: 'This field is required!'
          })}
        />
        {errors.email && (
          <span className='text-red-500'>
            {errors.email.message}
          </span>
        )}
      </label>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        <span>Password</span>
        <input
          type='password'
          className='border rounded-sm w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'This field is required!',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            },
            maxLength: {
              value: 128,
              message: 'Password must be at most 128 characters'
            }
          })}
        />
        {errors.password && (
          <span className='text-red-500'>
            {errors.password.message}
          </span>
        )}
      </label>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        <span>Confirm Password</span>
        <input
          type='password'
          className='border rounded-sm w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) {
                return 'This filed is required!';
              } else if (watch('password') !== value) {
                return 'Your passwords do not match'
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span>
        <button
          type='submit'
          className='bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-xl rounded-md cursor-pointer'
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default RegisterPage;