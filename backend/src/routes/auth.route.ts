import { Router } from 'express';
import { loginUserValidator } from '../validators/userValidators';
import { loginUser } from '../controllers/auth.controller';

const router = Router();

router.post('/login', loginUserValidator, loginUser);

export default router;