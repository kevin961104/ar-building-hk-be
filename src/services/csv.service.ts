import { Building } from '../entity/building.entity';
import { dataSource } from '../data-source';
import fs from "fs";
import csv from "csv-parser";
import logger from '../config/logger.config';

const db = dataSource.getRepository(Building);

const loadCsvToTheDb = async (csvPath: string)
: Promise<boolean> => {
  await db.clear();
  fs.createReadStream(csvPath).pipe(csv())
  .on("data", async data => {
    const building = new Building();
    building.building_name_en = nullIf(toTitleCase(data["Name of Building"])) || nullIf(toTitleCase(data["Name of Estate"])) || nullIf(toTitleCase(data["address_1"]));
    building.estate_name_en =  nullIf(toTitleCase(data["Name of Estate"])) || nullIf(toTitleCase(data["Name of Building"])) || nullIf(toTitleCase(data["address_1"])),
    building.district = nullIf(toTitleCase(data["District"])),
    building.address = nullIf(toTitleCase(data["address_1"])),
    building.year_built = nullIf(data["Year Built"]),
    building.no_of_units = data["No. of Units"] || null,
    building.no_of_storey = data["No. of Storeys"] || null,
    building.no_of_basement = data["No. of Basement"] || null,
    building.latitude = Number(data["lat"]),
    building.longitude = Number(data["lng"]),
    logger.info(building);
    await db.save(building);
  });
  //await db.save(null);
  return true;
};

const toTitleCase = (str: string) => {
  const strNew = str.replace(/,\s/g, ',').replace(/,/g, ', ');
  return strNew.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  ).replace(/\s,\s/g, ', ').replace(/\sAnd\s/g, ' and ');
}

const nullIf = (str: string) => {
  return str === "" ? null : str;
}
export {
  loadCsvToTheDb
};