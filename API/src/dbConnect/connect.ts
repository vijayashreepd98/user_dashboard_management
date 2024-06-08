const {Sequelize} = require(`sequelize`);
//postgresql://postgres:[MY_PASSWORD]@localhost:5432/[DATABASE_NAME]
export const sequelize = new Sequelize(`postgresql://postgres:password@localhost:5433/user-db`,{    logging: false // Disable logging
});

async function connectToBD(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

connectToBD();