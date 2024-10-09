const router = require("express").Router();

const Librain = require("../models/librainModel");
const User = require("../models/userModel");
const History = require("../models/historyModal");
const Book = require("../models/bookModel");

router.get("/book/history", async (req, res, next) => {
	try {
		const data = await History.findAll({
			where: { userId: req.tokenData.useId },
		});
		res.status(200).json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.get("/book/borrowed", async (req, res, next) => {
	try {
		const data = await Book.findAll({
			where: { isAvalable: "no", userId: req.tokenData.useId },
			attributes: ["id", "title", "author"],
		});
		res.status(200).json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.get("/book/available", async (req, res, next) => {
	try {
		const data = await Book.findAll({
			where: { isAvalable: "yes", isActive: "yes" },
			attributes: ["id", "title", "author"],
		});
		res.status(200).json(data);
	} catch {
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.post("/book/borrow/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findByPk(id);
		if (!book || book.isActive == "no") {
			const err = new Error("book not avalable");
			err.status = 401;
			return next(err);
		}
		if (book.isAvalable == "no") {
			const err = new Error("book is already borrowed");
			err.status = 401;
			return next(err);
		}
		book.isAvalable = "no";
		book.userId = req.tokenData.useId;
		await book.save();
		const dataHistory = {
			timestamp: new Date(),
			userId: req.tokenData.useId,
			bookId: id,
			isAvalable: "borrowed",
		};
		await History.create(dataHistory);
		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.post("/book/return/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findByPk(id);
		if (!book || book.isActive == "no") {
			const err = new Error("book not avalable");
			err.status = 401;
			return next(err);
		}
		if (book.isAvalable == "yes") {
			const err = new Error("book is already returned");
			err.status = 401;
			return next(err);
		}
		if (book.userId != req.tokenData.useId) {
			const err = new Error("book borrower dosent match");
			err.status = 401;
			return next(err);
		}
		book.isAvalable = "yes";
		await book.save();
		const dataHistory = {
			timestamp: new Date(),
			userId: req.tokenData.useId,
			bookId: id,
			isAvalable: "return",
		};
		await History.create(dataHistory);
		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		console.log(req.tokenData.useId);
		const user = await User.findByPk(req.tokenData.useId);
		if (!user) {
			const err = new Error("user not found");
			err.status = 401;
			return next(err);
		}
		const books = await Book.findAll({
			where: { userId: req.tokenData.useId, isAvalable: "no" },
		});
		if (books.length > 0) {
			const err = new Error("user has books to be return");
			err.status = 402;
			return next(err);
		}
		user.isActive = "no";
		user.deletedBy = 0;
		// console.log(user instanceof User);
		await user.save();
		return res.sendStatus(201);
	} catch (er) {
		console.log(er);
		const err = new Error("server error");
		err.status = 500;
		next(err);
	}
});

module.exports = router;
