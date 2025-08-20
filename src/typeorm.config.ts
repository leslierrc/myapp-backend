import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL,
  synchronize: true, // ⚠️ Solo en desarrollo
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: false,
});