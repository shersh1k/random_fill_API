import * as express from 'express';
import api from './api';
import { auth } from './auth';
import User from '../mongoDB/models/User';

const router = express.Router();
router.use('/api', api);
router.get('/generate', auth.required, function (req, res, next) {
    User.findById((req.user as any).id)
        .then(function (user) {
            if (!user) return res.sendStatus(401);
            return;
        })
        .catch(next);
});

export default router;