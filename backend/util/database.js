const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
// async function databaseTest() {
// 	try {
// 		// await sequelize.authenticate();
// 		await sequelize.sync({ force: true });
// 		// sequelize.sync();

// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }
// databaseTest();
module.exports = sequelize;