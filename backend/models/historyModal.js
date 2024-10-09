const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const History = sequelize.define("history", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
		unique: true,
	},
	isAvalable: {
		type: DataTypes.ENUM("borrowed","return"), 
		allowNull: false, 
		defaultValue: "borrowed", 
		validate: {
			isIn: [["borrowed","return"]],
		},
	},
    timestamp:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    bookId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = History;
