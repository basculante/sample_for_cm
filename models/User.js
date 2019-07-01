const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	displayName: String,
	picture: String
});

mongoose.model("users", userSchema);
