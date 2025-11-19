import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { HotelFormData } from '../../types/hotelFormData';
import type { HotelType } from '../../types/hotelType';
import HotelDetailsSection from './HotelDetailsSection';
import HotelTypeSection from './HotelTypeSection';
import HotelFacilitiesSection from './HotelFacilitiesSection';
import HotelGuestsSection from './HotelGuestsSection';
import HotelImagesSection from './HotelImagesSection';

type ManageHotelFormProps = {
  hotel?: HotelType;
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({
  hotel,
  onSave,
  isLoading
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append('hotelId', hotel._id);
    };

    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    };

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        className='flex flex-col gap-10'
        onSubmit={onSubmit}
      >
        <HotelDetailsSection />
        <HotelTypeSection />
        <HotelFacilitiesSection />
        <HotelGuestsSection />
        <HotelImagesSection />

        <span className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-500 text-xl disabled:bg-gray-500'
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;