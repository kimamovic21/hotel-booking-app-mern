import { useMutation, useQueryClient } from 'react-query';
import { signOutUser } from '../../api/api-client';
import { useAppContext } from '../../contexts/AppContext';

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();

  const mutation = useMutation(signOutUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');

      showToast({
        message: 'Signed out!',
        type: 'SUCCESS',
      });
    },
    onError: (error: Error) => {
      console.error(error.message);

      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const handleSignoutUser = () => {
    mutation.mutate();
  };

  return (
    <button
      className='bg-white rounded-md text-blue-600 px-4 py-2 font-bold hover:bg-gray-200 cursor-pointer'
      onClick={handleSignoutUser}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;