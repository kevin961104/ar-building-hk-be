import { Router } from 'express';
import { fetchBuildings, fetchBuildingTransaction } from '../../controllers/building.controller';
import { responseSender } from '../../middlewares';

const router = Router();

router.get('/', fetchBuildings, responseSender);
router.get('/tnx', fetchBuildingTransaction, responseSender);

export default router;
