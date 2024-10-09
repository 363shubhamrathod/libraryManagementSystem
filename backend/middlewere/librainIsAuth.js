const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	const token = req.get("Authorization");
	if (!token) {
		err = new Error("Token Not attached");
		err.status = 404;
		return next(err);
	}
	try {
		const authToken = token.split(" ")[1];
		// console.log(typeof authToken);
		// console.log(authToken);
		const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
		// console.log(decoded);
		if (!decoded) {
			err = new Error("Token not valid");
			err.status = 404;
			return next(err);
		}
		if (decoded.role != "Librain") {
			err = new Error("Token not valid");
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
