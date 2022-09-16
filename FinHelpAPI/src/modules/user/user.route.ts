import * as express from 'express';
import UserController from './user.controller';
const router = express.Router();

router.get('/', (req, res) => {
    void UserController.getList(req, res);
});

export default router;
