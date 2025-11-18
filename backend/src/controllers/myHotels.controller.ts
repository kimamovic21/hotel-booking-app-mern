import type { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { HotelType } from '../types/hotelType';
import Hotel from '../models/hotel';

export async function createHotel(req: Request, res: Response) {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const uploadPromises = imageFiles.map((async (image) => {
      const base64 = Buffer.from(image.buffer).toString('base64');
      const dataURI = 'data:' + image.mimetype + ';base64,' + base64;
      const response = await cloudinary.uploader.upload(dataURI);

      return response.url;
    }));

    const cloudinaryImageUrls = await Promise.all(uploadPromises);

    newHotel.imageUrls = cloudinaryImageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    return res.status(201).send(hotel);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: 'Something went wrong!' });
  };
};

export async function getAllHotels(req: Request, res: Response) {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    if (!hotels || hotels.length === 0) {
      return res
        .status(404)
        .json({ message: 'No hotels found for this user.' });
    };

    return res.status(200).json(hotels);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: 'Error fetching data!' });
  };
};