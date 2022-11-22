const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({}).populate("user", {
		blogs: 0,
	});
	res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	blog ? res.json(blog) : res.status(404).end();
});

blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
	const { title, author, url, likes } = req.body;

	if (!title || !author || !url) return res.status(400).end();

	const user = await User.findById(req.user);
	const blog = new Blog({
		title: title,
		author: author,
		url: url,
		likes: likes || 0,
		user: user._id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
	const { title, author, url, likes } = req.body;

	const updatedBlog = await Blog.findByIdAndUpdate(
		req.params.id,
		{
			title,
			author,
			url,
			likes,
		},
		{ new: true, runValidators: true, context: "query" }
	);
	res.json(updatedBlog);
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog.user.toString() !== req.user)
		return res.status(401).json({ error: "unauthorized user" });

	await Blog.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

module.exports = blogsRouter;
