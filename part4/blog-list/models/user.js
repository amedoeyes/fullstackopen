const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: [3, "username must be at least 3 characters"],
		required: [true, "username is required"],
	},
	name: {
		type: String,
		required: [true, "name is required"],
	},
	passwordHash: {
		type: String,
		required: [true, "password is required"],
	},
	blogs: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Blog",
		},
	],
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model("User", userSchema);
