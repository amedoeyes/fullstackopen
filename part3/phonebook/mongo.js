const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log(
		"Please provide the password as an argument: node mongo.js <password>"
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.ktwew1d.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3)
	return mongoose.connect(url).then(() => {
		Person.find({})
			.then((people) => {
				console.log("phonebook:");
				people.forEach((person) =>
					console.log(`${person.name} ${person.number}`)
				);
			})
			.then(() => {
				mongoose.connection.close();
			});
	});

mongoose
	.connect(url)
	.then(() => {
		console.log("connected");
		const person = new Person({
			name: process.argv[3],
			number: process.argv[4],
		});
		return person.save();
	})
	.then((person) => {
		console.log(
			`added ${person.name} with number ${person.number} to the phonebook`
		);
		return mongoose.connection.close();
	})
	.catch((err) => {
		console.log(err._message);
		return mongoose.connection.close();
	});
