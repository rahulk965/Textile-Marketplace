import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';

dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;
if (dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE || path.resolve(process.cwd(), 'database', 'saree.sqlite'),
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      dialect,
      logging: false,
    }
  );
}

export { sequelize };
