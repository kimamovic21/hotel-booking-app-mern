import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import type { SignInFormData } from '../types/signInFormData';
import { signInUser } from '../api/api-client';
import { useAppContext } from '../contexts/AppContext';

const SignInPage = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<SignInFormData>();

  const mutation = useMutation(signInUser, {
    onSuccess: async () => {
      showToast({
        message: 'Sign in Successful!',
        type: 'SUCCESS',
      });

      await queryClient.invalidateQueries('validateToken');

      navigate('/');
    },
    onError: (error: Error) => {
      console.error(error.message);
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const onSubmit = handleSubmit((formData) => {
    mutation.mutate(formData);
  });

  return (
    <form
      className='flex flex-col gap-5'
      onSubmit={onSubmit}
    >
      <h2 className='text-3xl font-bold'>
        Sign In
      </h2>

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

      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          <span className='mr-1'>
            Not registered?
          </span>

          <Link to='/register' className='underline hover:text-blue-600'>
            Click here to create an account
          </Link>
        </span>

        <button
          type='submit'
          className='bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-xl rounded-md cursor-pointer'
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignInPage;