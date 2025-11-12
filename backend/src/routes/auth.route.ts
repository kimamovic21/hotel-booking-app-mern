import { Router } from 'express';
import { 
  loginUserValidator, 
  registerUserValidator 
} from '../validators/authValidators';
import { 
  loginUser, 
  registerUser 
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUserValidator, loginUser);

export default router;