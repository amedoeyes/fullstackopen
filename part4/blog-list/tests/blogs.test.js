const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("../utils/listHelper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

test("dummy returns one", () => {
	const blogs = [];

	const result = helper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = helper.totalLikes([]);
		expect(result).toBe(0);
	});

	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = helper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("of a bigger list is calculated right", () => {
		const result = helper.totalLikes(helper.listOfBlogs);
		expect(result).toBe(36);
	});
});

describe("favorite blog", () => {
	test("return favorite blog", () => {
		const result = helper.favoriteBlog(helper.listOfBlogs);
		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		});
	});
});

describe("most blogs", () => {
	test("return author with most blogs", () => {
		const result = helper.mostBlogs(helper.listOfBlogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		});
	});
});

describe("most likes", () => {
	test("return author with most likes", () => {
		const result = helper.mostLikes(helper.listOfBlogs);
		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17,
		});
	});
});

describe("HTTP requests", () => {
	let token = "";

	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("test", 10);
		const user = new User({
			username: "test",
			name: "test",
			passwordHash,
		});
		await user.save();

		const login = await api
			.post("/api/login")
			.send({ username: "test", password: "test" });

		token = login.body.token;

		const authorizedUser = await User.findOne({
			username: login.body.username,
		});

		await Blog.deleteMany({});

		let blogs = helper.listOfBlogs;
		blogs = blogs.map((blog) => ({ ...blog, user: authorizedUser._id }));

		await Blog.insertMany(blogs);
	});

	test("GET all", async () => {
		const blogs = await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(blogs.body).toHaveLength(helper.listOfBlogs.length);
	});

	test("GET id exists", async () => {
		const blogs = await api.get("/api/blogs").expect(200);

		blogs.body.forEach((blog) => expect(blog.id).toBeDefined());
	});

	test("POST valid", async () => {
		const blog = {
			title: "test title",
			author: "test author",
			url: "test.com",
		};

		await api
			.post("/api/blogs")
			.send(blog)
			.set("Authorization", `Bearer ${token}`)
			.expect(201);

		const blogsInDb = await helper.blogsInDb();
		expect(blogsInDb).toHaveLength(helper.listOfBlogs.length + 1);

		const titles = blogsInDb.map((blog) => blog.title);
		expect(titles).toContain(blog.title);
	});

	test("POST unauthorized", async () => {
		const blog = {
			title: "test title",
			author: "test author",
			url: "test.com",
		};

		await api
			.post("/api/blogs")
			.send(blog)
			.set("Authorization", "Bearer ")
			.expect(401);
	});

	test("POST missing likes", async () => {
		const blog = {
			title: "test title",
			author: "test author",
			url: "test.com",
		};

		const res = await api
			.post("/api/blogs")
			.send(blog)
			.set("Authorization", `Bearer ${token}`)
			.expect(201);

		expect(res.request._data.likes).not.toBeDefined();
	});

	test("POST missing url or title", async () => {
		const blog = {
			author: "test author",
		};

		const res = await api
			.post("/api/blogs")
			.send(blog)
			.set("Authorization", `Bearer ${token}`)
			.expect(400);

		expect(res.request._data.title).not.toBeDefined();
		expect(res.request._data.url).not.toBeDefined();
	});

	afterAll(() => mongoose.connection.close());
});
