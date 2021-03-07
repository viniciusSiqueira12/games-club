import { Router } from 'express';
import authRoutes from '@api/routes/auth.routes';
import followerRoutes from '@api/routes/followers.routes';
import usersRoutes from '@api/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/followers', followerRoutes);

export default routes;