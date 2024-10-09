const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
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
	isActive: {
		type: DataTypes.ENUM("yes", "no"), // Define the enum field
		allowNull: false, // Optionally, set the field to be non-nullable
		defaultValue: "yes", // You can set a default value if needed
		validate: {
			isIn: [["yes", "no"]], // Ensures the value is one of these
		},
	},
	deletedBy: {
		type: DataTypes.INTEGER,  
		defaultValue: 0, 
	},
});

module.exports = User;
