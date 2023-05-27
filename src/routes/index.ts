import * as express from 'express';
import createError from 'http-errors';
import { requestLogger } from '../middlewares';
import apiRoute from './api';

const router = express.Router();

router.use(requestLogger);

router.get('/', (req, res) => res.send('Ok'));
router.get('/_health', (req, res) => res.send('Ok'));
router.get('/.well-known/pki-validation/31F28EC84DE2299FCE4FD319B931677B.txt', 
(req, res) => 
res.download('./src/routes/31F28EC84DE2299FCE4FD319B931677B.txt')
);
router.use('/api', apiRoute);

router.use('*', (req, res, next) => next(createError(404, 'Not found')));

export default router;
