import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchMyHotelById, updateMyHotelById } from '../api/myHotelClient';
import { useAppContext } from '../contexts/AppContext';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const EditHotelPage = () => {
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  const { data: hotel } = useQuery(
    'fetchMyHotelById',
    () => fetchMyHotelById(hotelId || ''),
    {
      enabled: !!hotelId,
    },
  );

  return (
    <div>
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditHotelPage;