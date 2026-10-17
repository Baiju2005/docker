const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  },
);

const connectDB = async () => {
  
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync();
    console.log("Database models synchronized successfully.");
  } catch (error) {
    console.error("Unable to initialize the database:", error);
    throw error;
  }

};

module.exports = { sequelize, connectDB };
