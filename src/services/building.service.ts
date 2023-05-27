import { Building } from '../entity/building.entity';
import { dataSource } from '../data-source';

const db = dataSource.getRepository(Building);

const getBuildingById = async (id: number)
: Promise<Building> => {
  const bulding = await db.findOneBy({
    id: id
  })
  return bulding;
};

const fetchBuildingsByLatitudeAndLongitude = async (
  latitude: number, 
  longitude: number
): Promise<Building[]> => {
  const buildings = await db.findBy({
    latitude: latitude,
    longitude: longitude
  })
return buildings;
};

const fetchBuildingsByBbox = async (
  west: number, 
  south: number,
  east: number,
  north: number
): Promise<Building[]> => {
  const buildings = await db.createQueryBuilder('b')
  .where('b.latitude between :south and :north', { south, north })
  .andWhere('b.longitude between :west and :east', { west, east })
  .getMany();
  return buildings;
};

export {
  getBuildingById,
  fetchBuildingsByLatitudeAndLongitude,
  fetchBuildingsByBbox
};