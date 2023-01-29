import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrationsRun: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
