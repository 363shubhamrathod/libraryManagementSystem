const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");
module.exports = async (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		err = new Error("Token Not attached");
		err.status = 404;
		return next(err);
	}
	try {
		const authToken = token.split(" ")[1];
		// console.log(authToken);
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
		if (!decoded) {
			err = new Error("Token not valid");
			err.status = 404;
			return next(err);
		}
		if (decoded.role != "User") {
			err = new Error("Token not valid");
			err.status = 404;
			return next(err);
		}
		const user = await User.findByPk(decoded.useId);
		if (user.isActive == "no") {
			err = new Error("user dosenot exist");
			err.status = 404;
			return next(err);
		}
		req.tokenData = decoded;
		next();
	} catch {
		err = new Error("Invalid request");
		err.status = 404;
		next(err);
	}
};
