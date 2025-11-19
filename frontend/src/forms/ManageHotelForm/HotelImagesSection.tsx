import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from '../../types/hotelFormData';

const HotelImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch('imageUrls');
  const imageFiles = watch('imageFiles');

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) {
      setPreviewImages([]);
      return;
    };

    const newPreviews = Array.from(imageFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(newPreviews);

    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [imageFiles]);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      'imageUrls',
      existingImageUrls.filter((url: string) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Images</h2>

      <div>
        <h3 className='font-semibold mb-1'>
          Saved Images
        </h3>

        <div className='border border-gray-300 p-2'>
          {existingImageUrls && existingImageUrls.length > 0 ? (
            <div className='grid grid-cols-6 gap-4'>
              {existingImageUrls.map((imageUrl: string) => (
                <div key={imageUrl} className='relative group'>
                  <img
                    src={imageUrl}
                    alt='Cloudinary Image URL'
                    className='min-h-full object-cover'
                  />
                  <button
                    className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white cursor-pointer'
                    onClick={(event) => handleDelete(event, imageUrl)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>
              No saved images.
            </p>
          )}
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='font-semibold mb-1'>
          Images To Upload
        </h3>

        <div className='border border-gray-300 p-2'>
          {previewImages.length > 0 ? (
            <div className='grid grid-cols-6 gap-4'>
              {previewImages.map((preview, index) => (
                <div key={index} className='relative'>
                  <img
                    src={preview}
                    alt='Preview'
                    className='min-h-full object-cover rounded'
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-sm'>
              No new images selected yet.
            </p>
          )}
        </div>
      </div>

      <div className='mt-3'>
        <input
          type='file'
          multiple
          accept='image/*'
          className='w-full text-gray-700 font-normal cursor-pointer'
          {...register('imageFiles', {
            validate: (imageFiles) => {
              const totalLength =
                (imageFiles?.length || 0) + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return 'At least one image should be added!';
              };

              if (totalLength > 6) {
                return 'Total number of images cannot be more than 6!';
              };

              return true;
            },
          })}
        />
      </div>

      {errors.imageFiles && (
        <span className='text-red-500 text-sm font-bold'>
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default HotelImagesSection;