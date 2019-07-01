const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSurveySchema = new Schema(
	{
		user: String,
		surveyId: String,
		surveyName: String,
		questionSet: [Schema.Types.Mixed],
		_user: { type: Schema.Types.ObjectId, ref: "User" }
	},
	{ strict: false }
);

mongoose.model("newSurvey", newSurveySchema);
