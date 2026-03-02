import express from 'express';
import * as MovieController from './movie.controller';
import { validate } from '../../middlewares/validate';
import { MovieSchema } from './movievalidation';
const router = express.Router();

router.post('/', validate(MovieSchema), MovieController.createMovie);
router.get('/', MovieController.getMovies);
router.get('/recommended', MovieController.getTopMoviesByVotes);
router.get('/:id', MovieController.getMovieById);

export default router;
