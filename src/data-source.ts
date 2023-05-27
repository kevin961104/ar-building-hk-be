import { DataSource } from "typeorm";
import { DATABASE } from "./constants";
import { Building } from "./entity/building.entity";
import { BuildingTransaction } from "./entity/building_transaction.entity";

export const dataSource = new DataSource({
  type: "mysql",
  host: DATABASE.host,
  port: Number(DATABASE.port),
  username: DATABASE.username,
  password: DATABASE.password,
  database: DATABASE.name,
  synchronize: true,
  logging: true,
  entities: [Building, BuildingTransaction],
  subscribers: [],
  migrations: [],
})