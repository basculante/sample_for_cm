const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	programPaid: { type: Boolean, default: null }
});

mongoose.model("users", userSchema);
