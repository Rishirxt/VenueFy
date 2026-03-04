import { Router, Request, Response } from 'express';
import * as EventController from './event.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', (req: Request, res: Response) => { EventController.getAllEvents(req, res); });
router.get('/:id', (req: Request, res: Response) => { EventController.getEventById(req, res); });
router.post('/book', authMiddleware, (req: Request, res: Response) => { EventController.bookEvent(req, res); });

export default router;
