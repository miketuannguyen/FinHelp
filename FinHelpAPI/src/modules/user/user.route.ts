import * as express from 'express';
import ROUTES from '../routes';
import UserController from './user.controller';
const router = express.Router();

router.post(ROUTES.USER.LOGIN, (req, res) => {
    void UserController.login(req, res);
});

export default router;
