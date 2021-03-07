import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import FollowerController from '../controllers/FollowerController';

const followersRoutes = Router();
const followerController = new FollowerController();

followersRoutes.post('/toggle/:FkFollowingId', ensureAuthenticated, followerController.toggle);

followersRoutes.get('/followings', ensureAuthenticated, followerController.followings);
export default followersRoutes;