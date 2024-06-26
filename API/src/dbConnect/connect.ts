import path from "path";
require('dotenv').config();
const { Sequelize } = require("sequelize");
const fs = require("fs");

export const sequelize = new Sequelize(
  `postgresql://postgres.[user_name]@[host]:6543/postgres`,
  {
    dialect: "postgres",
    dialectModule: require('pg'),
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: process.env.DB_CERTIFICATE,
      },
    },
  }
);

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectToDB();
