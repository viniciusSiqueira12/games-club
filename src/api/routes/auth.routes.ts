import AuthController from '@api/controllers/AuthController';
import { Router } from 'express';
const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/', authController.auth);

export default authRoutes;