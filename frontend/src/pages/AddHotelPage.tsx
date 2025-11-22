import { useMutation } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import { addMyHotel } from '../api/myHotelClient';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const AddHotelPage = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel!', type: 'ERROR' });
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
      <ManageHotelForm
        onSave={handleSave}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddHotelPage;