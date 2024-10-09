const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Librain = require("../models/librainModel");
const User = require("../models/userModel");
const History = require("../models/historyModal");
const Book = require("../models/bookModel");

router.get("/user/all", async (req, res, next) => {
	try {
		const data = await User.findAll({
			attributes: ["username", "isActive", "deletedBy", "id"],
		});
		return res.json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.get("/book", async (req, res, next) => {
	try {
		const data = await Book.findAll({
			where: { isActive: "yes" },
			attributes: [
				"title",
				"author",
				"id",
				"librainId",
				"isAvalable",
				"userId",
                "isActive"
			],
		});
		return res.json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.post("/book", async (req, res, next) => {
	try {
		const data = {
			title: req.body.title,
			author: req.body.author,
		};
        console.log(data);
		const librain = await Librain.findByPk(req.tokenData.libId);
		await librain.createBook(data);
		res.sendStatus(201);
	} catch {
		const err = new Error("invalid request");
		err.status = 401;
		next(err);
	}
});

router.get("/book/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findByPk(id);
		if (!book || book.isActive == "no") {
			const err = new Error("book not found");
			err.status = 404;
			return next(err);
		}
		res.status(200).json({
			title: book.title,
			author: book.author,
			id: book.id,
			librainId: book.librainId,
			isAvalable: book.isAvalable,
			userId: book.userId,
		});
	} catch {
		const err = new Error("invalid request");
		err.status = 501;
		next(err);
	}
});

router.put("/book/:id", async (req, res, next) => {
	const { id } = req.params;
	const data = {
		title: req.body.title,
		author: req.body.author,
	};
	try {
		const book = await Book.findByPk(id);
		if (!book || book.isActive == "no") {
			const err = new Error("book not found");
			err.status = 404;
			return next(err);
		}
		if (!data.title || !data.author) {
			const err = new Error("data not valid");
			err.status = 404;
			return next(err);
		}
		book.title = data.title;
		book.author = data.author;
		await book.save();
		res.sendStatus(201);
	} catch {
		const err = new Error("invalid request");
		err.status = 501;
		next(err);
	}
});

router.delete("/book/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findByPk(id);
		if (!book || book.isActive == "no") {
			const err = new Error("book not found");
			err.status = 404;
			return next(err);
		}
		book.isActive = "no";
        book.deletedBy=req.tokenData.libId;
		await book.save();
		res.sendStatus(200);
	} catch {
		const err = new Error("invalid request");
		err.status = 501;
		next(err);
	}
});

router.get("/user", async (req, res, next) => {
	try {
		const data = await User.findAll({
			where: { isActive: "yes" },
			attributes: ["username", "id"],
		});
		return res.json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.post("/user", async (req, res, next) => {
	try {
		const data = {
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
		};
		await User.create(data);
		res.sendStatus(200);
	} catch {
		const err = new Error("invalid requests");
		err.status = 401;
		next(err);
	}
});

router.get("/user/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (!user || user.isActive == "no") {
			const err = new Error("user not found");
			err.status = 404;
			return next(err);
		}
		res.status(200).json({ username: user.username, id: user.id });
	} catch {
		const err = new Error("invalid request");
		err.status = 501;
		next(err);
	}
});

router.put("/user/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const data = {
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
		};
		const user = await User.findByPk(id);
		if (!user || user.isActive == "no") {
			const err = new Error("user not found");
			err.status = 404;
			return next(err);
		}
		if (!data.username || !data.password) {
			const err = new Error("data not valid");
			err.status = 404;
			return next(err);
		}
		user.username = data.username;
		user.password = data.password;
		await user.save();
		res.sendStatus(200);
	} catch {
		const err = new Error("invalid request");
		err.status = 401;
		next(err);
	}
});

router.delete("/user/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (!user || user.isActive == "no") {
			const err = new Error("user not found");
			err.status = 404;
			return next(err);
		}
		user.isActive = "no";
		user.deletedBy = req.tokenData.libId;
		await user.save();
		res.sendStatus(200);
	} catch {
		const err = new Error("invalid request");
		err.status = 401;
		next(err);
	}
});

router.get("/history", async (req, res, next) => {
	try {
		const data = await History.findAll();
		return res.json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

module.exports = router;
