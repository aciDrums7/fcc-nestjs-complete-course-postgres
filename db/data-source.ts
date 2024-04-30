import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'fcc-nestjs-spotify-clone-migration',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};

export default new DataSource(dataSourceOptions);
