const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("HTTP requests", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("test", 10);
		const user = new User({
			username: "test",
			name: "test",
			passwordHash,
		});

		await user.save();
	});

	test("POST short username", async () => {
		const user = {
			username: "te",
			name: "test",
			password: "test",
		};

		const result = await api.post("/api/users").send(user).expect(400);
		expect(result.body.error).toBe(
			"username must be at least 3 characters"
		);
	});

	test("POST duplicate username", async () => {
		const user = {
			username: "test",
			name: "test",
			password: "test",
		};

		const result = await api.post("/api/users").send(user).expect(400);
		expect(result.body.error).toBe("username must be unique");
	});

	test("POST short password", async () => {
		const user = {
			username: "test2",
			name: "test",
			password: "te",
		};

		const result = await api.post("/api/users").send(user).expect(400);
		expect(result.body.error).toBe(
			"password must be at least 3 characters"
		);
	});

	afterAll(() => mongoose.connection.close());
});
