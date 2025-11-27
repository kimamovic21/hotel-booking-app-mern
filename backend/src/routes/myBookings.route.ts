import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { getMyBookings } from '../controllers/myBookings.controller';

const router = Router();

router.get('/', verifyToken, getMyBookings);

export default router;