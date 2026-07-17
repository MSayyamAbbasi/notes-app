import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'notes_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export const connectDB = async () => {
  const maxRetries = 10;
  const retryDelay = 5000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connecting to MySQL... (Attempt ${attempt}/${maxRetries})`);

      await sequelize.authenticate();

      console.log("✅ MySQL connected successfully.");

      await sequelize.sync({
        alter: process.env.NODE_ENV === "development",
      });

      console.log("✅ Database models synchronized.");

      return;
    } catch (error) {
      console.log(`❌ Connection failed: ${error.message}`);

      if (attempt === maxRetries) {
        console.error("Maximum retry attempts reached.");
        process.exit(1);
      }

      console.log(`Retrying in ${retryDelay / 1000} seconds...\n`);

      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

export default sequelize;
