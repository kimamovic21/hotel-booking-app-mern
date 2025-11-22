import { hotelFacilitiesArray } from '../../config/hotelOptionsConfig';

type SearchFacilitiesFilterProps = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchFacilitiesFilter = ({
  selectedFacilities,
  onChange
}: SearchFacilitiesFilterProps) => {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>
        Facilities
      </h4>

      {hotelFacilitiesArray.map((facility) => (
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default SearchFacilitiesFilter;