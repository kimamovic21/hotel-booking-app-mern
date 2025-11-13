import { Router } from 'express';
import { 
  loginUserValidator, 
  registerUserValidator 
} from '../validators/authValidators';
import { 
  loginUser, 
  registerUser, 
  validateToken
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUserValidator, loginUser);
router.get('/validate-token', verifyToken, validateToken);

export default router;