import { Sequelize } from 'sequelize';
import { resolve } from 'path';
import fs from 'fs';

export const sequelize = new Sequelize(`postgresql://postgres.azkftdtekzxclbaauphz:iQulOfht5XTE6JjG@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`, {
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: fs.readFileSync(resolve(__dirname, './prod-ca-2021.crt')),
        },
    },
});
async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
connectToDB();
