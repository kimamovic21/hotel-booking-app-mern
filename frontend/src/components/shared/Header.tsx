import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import SignOutButton from './SignOutButton';

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='bg-blue-800 p-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>
            MernHolidays.com
          </Link>
        </span>

        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <>
              <Link
                to='/my-bookings'
                className='flex items-center text-white px-2 py-4 hover:bg-blue-600 rounded-md font-semibold'
              >
                My Bookings
              </Link>

              <Link
                to='/my-hotels'
                className='flex items-center text-white px-2 py-4 hover:bg-blue-600 rounded-md font-semibold'
              >
                My Hotels
              </Link>

              <SignOutButton />
            </>
          ) : (
            <Link
              to='/sign-in'
              className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-200 rounded-sm'
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;