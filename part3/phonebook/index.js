require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

app.use(express.static("./frontend/build"));
app.use(express.json());

morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});
app.use(
	morgan(
		":date[iso] :method :url :status :res[content-length] - :response-time ms :body"
	)
);

app.get("/api/persons/info", (req, res) => {
	Person.find({}).then((people) => {
		const date = new Date();

		res.send(
			`<p>Phonebook ${
				people.length === 0
					? "doesn't have any data"
					: `has data for ${people.length} 
					${people.length === 1 ? "person" : "people"}`
			}</p>
			<p>${date}</p>`
		);
	});
});

app.get("/api/persons", (req, res) => {
	Person.find({}).then((people) => res.json(people));
});

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => (person ? res.json(person) : res.status(404).end()))
		.catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
	const body = req.body;

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => res.json(savedPerson))
		.catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
	const { number } = req.body;

	Person.findByIdAndUpdate(
		req.params.id,
		{ number },
		{ new: true, runValidators: true, context: "query" }
	)
		.then((updatedPerson) => res.json(updatedPerson))
		.catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
	res.status(404).send("error: unknown endpoint");
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
	console.error(err);

	if (err.name === "CastError")
		return res.status(400).send({ error: "invalid id" });

	if (err.name === "ValidationError") {
		let errors = {};
		Object.keys(err.errors).forEach((errorName) => {
			errors[errorName] = err.errors[errorName].message;
		});
		return res.status(400).send({ error: errors });
	}

	if (err.code === 11000) return res.status(409).end();

	next(err);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
