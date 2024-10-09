const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.set("views", "views");
app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "public")));

const backend = process.env.BACKEND || "http://localhost:3000";

app.get("/", (req, res) => {
	res.render("index.ejs", { backend });
});

app.get("/login", (req, res) => {
	res.render("login.ejs", { backend });
});

app.get("/signup", (req, res) => {
	res.render("signup.ejs", { backend });
});

app.get("/librain", (req, res) => {
	res.render("librianHomePage.ejs", { backend });
});

app.get("/librain/book", (req, res) => {
	res.render("librainBookPage.ejs", { backend });
});

app.get("/librain/book/add", (req, res) => {
	res.render("librainBookAddPage.ejs", { backend });
});

app.get("/librain/book/edit/:id", (req, res) => {
	const { id } = req.params;
	res.render("librainBookEditPage.ejs", { backend, id });
});

app.get("/librain/book/delete/:id", (req, res) => {
	const { id } = req.params;
	res.render("librainBookDeletePage.ejs", { backend, id });
});

app.get("/librain/user", (req, res) => {
	res.render("librainUserPage.ejs", { backend });
});

app.get("/librain/user/all", (req, res) => {
	res.render("librainUserAllPage.ejs", { backend });
});

app.get("/librain/user/add", (req, res) => {
	res.render("librainUserAddPage.ejs", { backend });
});

app.get("/librain/user/edit/:id", (req, res) => {
	const { id } = req.params;
	res.render("librainUserEditPage.ejs", { backend, id });
});

app.get("/librain/user/delete/:id", (req, res) => {
	const { id } = req.params;
	res.render("librainUserDeletePage.ejs", { backend, id });
});

app.get("/librain/history", (req, res) => {
	res.render("librainHistoryPage.ejs", { backend });
});

//.............................................................//

app.get("/user", (req, res) => {
	res.render("userHomePage.ejs", { backend });
});

app.get("/user/return/:id", (req, res) => {
	const { id } = req.params;
	res.render("userReturnBook.ejs", { backend, id });
});

app.get("/user/borrow", (req, res) => {
	res.render("userAvaiableBooks.ejs", { backend });
});

app.get("/user/borrow/:id", (req, res) => {
    const { id } = req.params;
	res.render("userBorrowBooks.ejs", { backend,id });
});

app.get("/user/delete", (req, res) => {
	res.render("userSelfDelete.ejs", { backend });
});

app.get("/user/history", (req, res) => {
	res.render("userHistory.ejs", { backend });
});

//.............................................................//
app.listen(process.env.PORT || 8000, () => {
	console.log("server started");
});
