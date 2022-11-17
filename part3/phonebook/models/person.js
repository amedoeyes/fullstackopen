const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
	.connect(url)
	.then(() => console.log("connected to MongoDB"))
	.catch((err) => console.log(err.message));

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, "name length must be at least 3 characters long"],
		unique: true,
		required: [true, "name is required"],
	},
	number: {
		type: String,
		minLength: [8, "number length must be at least 8 characters long"],
		validate: {
			validator: (v) => /\d{2,3}-?\d{6,}/.test(v),
			message: (props) => `${props.value} is not a valid phone number`,
		},
		required: [true, "number is required"],
	},
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
