import type { Request, Response } from 'express';
import type { HotelSearchResponse } from '../types/hotelSearchResponse';
import Hotel from '../models/hotel';

export async function searchHotel(req: Request, res: Response) {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel
      .find()
      .skip(skip)
      .limit(pageSize);

    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ message: 'No hotels found!' });
    };

    const total = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: 'Something went wrong!' });
  };
};