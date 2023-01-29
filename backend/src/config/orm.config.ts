import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const ConfigPG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: ['error', 'warn'],
};

export default ConfigPG;
