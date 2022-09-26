import * as express from 'express';
import { Middlewares } from '../../utils';
import ROUTES from '../routes';
import UserController from './user.controller';
const router = express.Router();

router.post(ROUTES.USER.LOGIN, UserController.login);
router.get(ROUTES.USER.PROFILE, Middlewares.authenticate(), UserController.getProfile);

export default router;
