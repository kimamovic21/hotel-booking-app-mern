import { FormProvider, useForm } from 'react-hook-form';
import type { HotelFormData } from '../../types/hotelFormData';
import HotelDetailsSection from './HotelDetailsSection';
import HotelTypeSection from './HotelTypeSection';
import HotelFacilitiesSection from './HotelFacilitiesSection';
import HotelGuestsSection from './HotelGuestsSection';
import HotelImagesSection from './HotelImagesSection';

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    

    console.log(formData);
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
            className='bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-500 text-xl'
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;