import { NextFunction } from 'express';
import logger from '../config/logger.config';
import { loadCsvToTheDb, loadTransactonCsvToTheDb } from '../services/csv.service';

const triggerCsvToDb = async (req: any, res: any, next: NextFunction) => {
  try {
    const loaded = await loadCsvToTheDb('./src/csv/address_privatebuilding_upload_version.csv');
    res.locals.result = { 
      loaded: loaded
    };
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const triggerTnxCsvToDb = async (req: any, res: any, next: NextFunction) => {
  try {
    const loaded = await loadTransactonCsvToTheDb('./src/csv/final_transaction.csv');
    res.locals.result = { 
      loaded: loaded
    };
    next();
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export {
  triggerCsvToDb,
  triggerTnxCsvToDb
};