import { hotelTypesArray } from '../../config/hotelOptionsConfig';

type SearchStarRatingFilterProps = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchHotelTypesFilter = ({
  selectedHotelTypes,
  onChange
}: SearchStarRatingFilterProps) => {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>
        Hotel Type
      </h4>

      {hotelTypesArray.map((hotelType) => (
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default SearchHotelTypesFilter;