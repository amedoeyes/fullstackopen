const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
	const users = await User.find({}).populate("blogs", {
		user: 0,
	});
	res.json(users);
});

usersRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;

	if (await User.findOne({ username }))
		return res.status(400).json({ error: "username must be unique" });

	if (password.length < 3)
		return res
			.status(400)
			.json({ error: "password must be at least 3 characters" });

	const passwordHash = await bcrypt.hash(password, 10);
	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

module.exports = usersRouter;
