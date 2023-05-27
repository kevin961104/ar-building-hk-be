import { Building } from '../entity/building.entity';
import { dataSource } from '../data-source';
import fs from "fs";
import csv from "csv-parser";
import logger from '../config/logger.config';
import { BuildingTransaction } from '../entity/building_transaction.entity';

const db = dataSource.getRepository(Building);
const buildingTxn = dataSource.getRepository(BuildingTransaction);

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

const loadTransactonCsvToTheDb = async (csvPath: string)
: Promise<boolean> => {
  await buildingTxn.clear();
    fs.createReadStream(csvPath).pipe(csv())
    .on("data", async data => {
        const building_txn = new BuildingTransaction();
        const buildingCase: Building = await db.findOne({where: {latitude: Number(data["lat"]), longitude: Number(data["lng"]) }})
        if (buildingCase !== null) {
          building_txn.unnamed = Number(nullIf(data["Unnamed: 0"]));
          building_txn.price =  nullIf(toTitleCase(data["price"])),
          building_txn.nfa = nullIf(toTitleCase(data["NFA"])),
          building_txn.date = nullIf(toTitleCase(data["date"])),
          building_txn.address = nullIf(data["address"]),
          building_txn.orientation = nullIf(zeroIf(toTitleCase(data["orientation"]))),
          building_txn.project_name = nullIf(data["project_name"]),
          building_txn.building_age = nullIf(data["building_age"]).replace('Year(s)', ' Year(s)'),
          building_txn.photo = nullIf(zeroIf(data["photo"])),
          building_txn.unit = nullIf(data["unit"]).replace('FFlat', 'F Flat'),
          building_txn.room = nullIf(data["room"]).replace('Room(s)', ' Room(s)'),
          building_txn.block = nullIf(zeroIf(data["block/phase"])),
          building_txn.district = nullIf(data["district"]),
          building_txn.latitude = Number(data["lat"]),
          building_txn.longitude = Number(data["lng"]),
          building_txn.building = buildingCase
          logger.info(building_txn);
          await buildingTxn.save(building_txn);
        }
    });
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

const zeroIf = (str: string) => {
  return str === "0" ? null : str;
}
export {
  loadCsvToTheDb,
  loadTransactonCsvToTheDb
};