import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected via Sequelize');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
};

export default sequelize;
