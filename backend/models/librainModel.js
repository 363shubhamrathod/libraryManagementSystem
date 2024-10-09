const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Librain = sequelize.define("librain", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		unique: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Librain;
