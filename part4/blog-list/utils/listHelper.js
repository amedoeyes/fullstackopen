const Blog = require("../models/blog");

const listOfBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
	let favoriteBlog = {
		title: "",
		author: "",
		likes: 0,
	};

	blogs.forEach((blog) => {
		if (blog.likes > favoriteBlog.likes) {
			favoriteBlog.title = blog.title;
			favoriteBlog.author = blog.author;
			favoriteBlog.likes = blog.likes;
		}
	});

	return favoriteBlog;
};

const mostBlogs = (blogs) => {
	let authors = [];
	blogs.forEach((blog) => {
		if (authors.some((author) => author.author === blog.author))
			return (authors = authors.map((author) =>
				author.author === blog.author
					? { ...author, blogs: author.blogs + 1 }
					: author
			));

		authors = authors.concat({ author: blog.author, blogs: 1 });
	});

	const mostBlogs = {
		author: "",
		blogs: 0,
	};

	authors.forEach((author) => {
		if (author.blogs > mostBlogs.blogs) {
			mostBlogs.author = author.author;
			mostBlogs.blogs = author.blogs;
		}
	});

	return mostBlogs;
};

const mostLikes = (blogs) => {
	let authors = [];
	blogs.forEach((blog) => {
		if (authors.some((author) => author.author === blog.author))
			return (authors = authors.map((author) =>
				author.author === blog.author
					? { ...author, likes: author.likes + blog.likes }
					: author
			));

		authors = authors.concat({ author: blog.author, likes: blog.likes });
	});

	const mostLikes = {
		author: "",
		likes: 0,
	};

	authors.forEach((author) => {
		if (author.likes > mostLikes.likes) {
			mostLikes.author = author.author;
			mostLikes.likes = author.likes;
		}
	});

	return mostLikes;
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = {
	listOfBlogs,
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	blogsInDb,
};
