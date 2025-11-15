import { useFormContext } from 'react-hook-form';
import { hotelFacilitiesArray } from '../../config/hotelOptionsConfig';
import type { HotelFormData } from '../../types/hotelFormData';

const HotelFacilitiesSection = () => {
  const {
    register,
    formState: {
      errors
    }
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>
        Facilities
      </h2>

      <div className='grid grid-cols-5 gap-3'>
        {hotelFacilitiesArray.map((hotelFacility) => (
          <label
            key={hotelFacility}
            className='text-sm flex items-center gap-1 text-gray-700'
          >
            <input
              type='checkbox'
              value={hotelFacility}
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return 'At least one facility is required!';
                  };
                }
              })}
            />
            {hotelFacility}
          </label>
        ))}
      </div>

      {errors.facilities && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;