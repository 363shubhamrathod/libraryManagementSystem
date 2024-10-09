const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Librain = require("../models/librainModel");
const User = require("../models/userModel");

router.post("/login", async (req, res, next) => {
    // console.log(req.body);
	try {
		const data = {
			username: req.body.username,
			password: req.body.password,
		};
		if (req.body.role == "Librain") {
			const librain = await Librain.findOne({
				where: { username: data.username },
			});
			if (!librain) {
				err = new Error("user dose not exit");
				err.status = 401;
				return next(err);
			}
			const isMatch = bcrypt.compareSync(req.body.password, librain.password);
			if (!isMatch) {
				err = new Error("password doent match");
				err.status = 401;
				return next(err);
			}
			const token = await jwt.sign(
				{ libId: librain.id, role: "Librain" },
				process.env.JWT_SECRET
			);
			return res.status(201).json({ token });
		} else if (req.body.role == "User") {
			const user = await User.findOne({
				where: { username: data.username },
			});
			// console.log(user);
			if (!user || user.isActive == "no") {
				err = new Error("user dose not exit");
				err.status = 401;
				return next(err);
			}
			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			// console.log(isMatch);
			if (!isMatch) {
				err = new Error("password doent match");
				err.status = 401;
				return next(err);
			}
			const token = await jwt.sign(
				{ useId: user.id, role: "User" },
				process.env.JWT_SECRET
			);
			return res.status(201).json({ token });
		} else {
			err = new Error("Invalid request");
			err.status = 404;
			next(err);
		}
	} catch {
		err = new Error("Invalid request");
		err.status = 404;
		next(err);
	}
});

router.post("/signup", async (req, res, next) => {
    // console.log(req.body);
	try {
		const data = {
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
		};
		if (req.body.role == "Librain") {
			await Librain.create(data);
			return res.sendStatus(201);
		} else if (req.body.role == "User") {
			await User.create(data);
			return res.sendStatus(201);
		} else {
			err = new Error("Invalid request");
			err.status = 404;
			next(err);
		}
	} catch {
		err = new Error("Invalid request");
		err.status = 404;
		next(err);
	}
});

module.exports = router;
