import { useFormContext } from 'react-hook-form';
import { hotelTypesArray } from '../../config/hotelOptionsConfig';
import type { HotelFormData } from '../../types/hotelFormData';

const HotelTypeSection = () => {
  const {
    register,
    watch,
    formState: {
      errors
    }
  } = useFormContext<HotelFormData>();

  const typeWatch = watch('type');

  const baseLabelClasses = 'cursor-pointer text-sm rounded-full px-4 py-2 font-semibold';

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>
        Type
      </h2>

      <div className='grid grid-cols-5 gap-2'>
        {hotelTypesArray.map((hotelType) => {
          const isSelected = typeWatch === hotelType;

          return (
            <label
              key={hotelType}
              className={`${baseLabelClasses} ${isSelected ? 'bg-blue-300' : 'bg-gray-300'}`}
            >
              <input
                type='radio'
                className='hidden'
                value={hotelType}
                {...register('type', {
                  required: 'This field is required!'
                })}
              />
              <span>
                {hotelType}
              </span>
            </label>
          )
        })}
      </div>

      {errors.type && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default HotelTypeSection;