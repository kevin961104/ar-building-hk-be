import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.config';
import { fetchBuildingsByBbox, fetchTransactionsByBuildingId } from '../services/building.service';
import createError from 'http-errors';

const fetchBuildings = async (req: any, res: any, next: NextFunction) => {
  try {
      if(req.query.bbox && /^[0-9\.\-\,]+$/.exec(req.query.bbox)) {
        const bbox = req.query.bbox?.split(',').map((str: string) => parseFloat(str)) || [];
        if(bbox.length == 4) {
          // West South East North
          const data = await fetchBuildingsByBbox(
            bbox[0], // West
            bbox[1], // South
            bbox[2], // East
            bbox[3] // North
          );
          res.locals.result = { buildings: data };
          next();
        } else {
          throw createError(400, 'Bbox does not have 4 values');
        } 
    } else {
      throw createError(400, 'Invalid bbox format');
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const fetchBuildingTransaction = async (req: any, res: any, next: NextFunction) => {
  try {
      if(req.query.building_id && /^[0-9\.\-\,]+$/.exec(req.query.building_id)) {
        const buildingId = req.query.building_id || -1;
        if(buildingId != -1) {
          const data = await fetchTransactionsByBuildingId(buildingId);
          res.locals.result = { buildingTnxs: data };
          next();
        } else {
          throw createError(400, 'Building id does not exist');
        } 
    } else {
      throw createError(400, 'Invalid building id format');
    }
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export {
  fetchBuildings,
  fetchBuildingTransaction
};