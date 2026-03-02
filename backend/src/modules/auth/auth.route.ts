import express, { Request, Response } from 'express';
import { unifiedLoginSignup, changePasswordController } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/unified', (req: Request, res: Response) => {
    unifiedLoginSignup(req, res);
});

router.patch('/change-password', authMiddleware, (req: Request, res: Response) => {
    changePasswordController(req, res);
});

export default router;
