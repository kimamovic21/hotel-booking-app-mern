import { Router } from 'express';
import {
  registerUserValidator,
  loginUserValidator
} from '../validators/authValidators';
import {
  registerUser,
  loginUser,
  validateToken,
  logoutUser,
  currentUser
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUserValidator, registerUser);
router.post('/login', loginUserValidator, loginUser);
router.get('/validate-token', verifyToken, validateToken);
router.get('/me', verifyToken, currentUser);
router.post('/logout', logoutUser);

export default router;