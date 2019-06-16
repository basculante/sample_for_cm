const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema = new Schema({
	surveyId: String,
	question1: String,
	question2: String,
	question3: String,
	question4: String,
	question5: String,
	_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("survey", surveySchema);
