import * as express from 'express';
import mapRouter from './map.api.route';
import csvRouter from './csv.api.route';

const router = express.Router();

router.use('/map', mapRouter);
router.use('/csv', csvRouter);

export default router;
