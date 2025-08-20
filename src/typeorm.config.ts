import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false, // ⚠️ No en producción
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});