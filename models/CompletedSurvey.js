const mongoose = require("mongoose");
const { Schema } = mongoose;

const completedSurveySchema = new Schema(
	{
		user: String,
		surveyId: String,
		surveyName: String,
		answers: [Schema.Types.Mixed],
		_user: { type: Schema.Types.ObjectId, ref: "User" }
	},
	{ strict: false }
);

mongoose.model("completedSurvey", completedSurveySchema);
