import { Router } from 'express';
import { registerUser } from '../controllers/users.controller';
import { registerUserValidator } from '../validators/userValidators';

const router = Router();

router.post('/register', registerUserValidator, registerUser);

export default router;