import { Router } from 'express';
import ensureAuthenticated from '@api/middlewares/ensureAuthenticated'; 
import uploadConfig from '@config/upload'; 
import multer from 'multer';
import UserController from '@api/controllers/UserController';
const upload = multer(uploadConfig);

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.post('/', userController.create);
usersRoutes.get('/verify/:Username', userController.verifyUsername);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userController.updateAvatar);

export default usersRoutes;