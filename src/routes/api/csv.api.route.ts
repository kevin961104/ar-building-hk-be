import { Router } from 'express';
import { responseSender } from '../../middlewares';
import { triggerCsvToDb, triggerTnxCsvToDb } from '../../controllers/csv.controller';

const router = Router();

router.post('/sync', triggerCsvToDb, responseSender);
router.post('/syncTxn', triggerTnxCsvToDb, responseSender);

export default router;