import { Router } from 'express';
import { responseSender } from '../../middlewares';
import { triggerCsvToDb } from '../../controllers/csv.controller';

const router = Router();

router.post('/sync', triggerCsvToDb, responseSender);

export default router;