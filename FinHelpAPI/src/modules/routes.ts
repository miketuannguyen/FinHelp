import * as express from 'express';
import { Middlewares } from '../utils';
import TagController from './tag/tag.controller';
import UserController from './user/user.controller';

const router = express.Router();

router.post('/user/login', UserController.login);
router.get('/user/profile', Middlewares.authenticate(), UserController.getProfile);

router.post('/user/tag', Middlewares.authenticate(), TagController.createTagOfUser);

export default router;
