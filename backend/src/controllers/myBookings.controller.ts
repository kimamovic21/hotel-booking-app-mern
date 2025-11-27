import type { Request, Response } from 'express';
import type { HotelType } from '../types/hotelType';
import Hotel from '../models/hotel';

export async function getMyBookings(req: Request, res: Response) {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    return res.status(200).send(results);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching bookings!' });
  };
};