const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Book = sequelize.define("book", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		unique: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: {
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
	isAvalable: {
		type: DataTypes.ENUM("yes", "no"), // Define the enum field
		allowNull: false, // Optionally, set the field to be non-nullable
		defaultValue: "yes", // You can set a default value if needed
		validate: {
			isIn: [["yes", "no"]], // Ensures the value is one of these
		},
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	deletedBy: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Book;
