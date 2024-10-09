const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
// eviroment variables................................................................//
require("dotenv").config();

//server app................................................................//
const app = express();

// body parser................................................................//
app.use(bodyParser.json());

// cors................................................................//
app.use(cors());
// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
// 	);
// 	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
// 	next();
// });

// Routes of server..........................................................//
// const adminRouter = require("./routes/admin");
// const flashCardRouter = require("./routes/flashcard");
// //
// app.use("/admin", adminRouter);
// app.use("/flashcard", flashCardRouter);
const loginSignupRouter = require("./routes/LoginSignup");
const librainRouter = require("./routes/librainRouter");
const userRouter = require("./routes/userRouter");
const librainIsAuth = require("./middlewere/librainIsAuth");
const userIsAuth = require("./middlewere/userIsAuth");

app.use("/", loginSignupRouter);
app.use("/librain", librainIsAuth, librainRouter);
app.use("/user", userIsAuth, userRouter);

// default respnce of all invalid api routes
app.use((req, res, next) => {
	res.status(404).json({
		error: "Route not found",
		message: `The requested URL ${req.originalUrl} was not found on this server.`,
	});
});

// error handing last middleware
app.use((err, req, res, next) => {
	// Set the status code, defaulting to 500 if not set
	res.status(err.status || 500);

	// Send a custom response
	res.json({
		error: {
			message: err.message,
		},
	});
});

// Databse realtionships................................................................//
const sequelize = require("./util/database");
const User = require("./models/userModel");
const Librain = require("./models/librainModel");
const History = require("./models/historyModal");
const Book = require("./models/bookModel");

Librain.hasMany(Book, { onDelete: "CASCADE" });
Book.belongsTo(Librain);

sequelize
	// .sync({ force: true })
	// .sync({ alter: true })
	.sync()
	.then(() => {
		app.listen(process.env.PORT || 3000);
		console.log("server started");
	})
	.catch((e) => {
		console.log(e);
	});
