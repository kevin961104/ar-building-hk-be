import { DataSource } from "typeorm";
import { DATABASE } from "./constants";
import { Building } from "./entity/building.entity";

export const dataSource = new DataSource({
  type: "mysql",
  host: DATABASE.host,
  port: Number(DATABASE.port),
  username: DATABASE.username,
  password: DATABASE.password,
  database: DATABASE.name,
  synchronize: true,
  logging: true,
  entities: [Building],
  subscribers: [],
  migrations: [],
})