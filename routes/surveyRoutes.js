const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const addSurvey = mongoose.model("survey");

module.exports = app => {
	app.get("/api/survey", requireLogin, async (req, res) => {
		const survey = await addSurvey.find({ _user: req.user.id });

		res.send(survey);
	});

	app.post("/api/addSurvey", requireLogin, async (req, res) => {
		const {
			surveyId,
			question1,
			question2,
			question3,
			question4,
			question5
		} = req.body;

		const addSurveyNew = new addSurvey({
			surveyId,
			question1,
			question2,
			question3,
			question4,
			question5,
			_user: req.user.id
		});

		try {
			addSurvey.findOne(
				{
					surveyId: surveyId,
					_user: req.user.id
				},
				function(err, survey) {
					if (!survey) {
						addSurveyNew.save();
						res.status(200).send("Survey Added!");
					} else {
						addSurvey.replaceOne(
							{
								_user: req.user.id
							},
							{
								surveyId,
								question1,
								question2,
								question3,
								question4,
								question5,
								_user: req.user.id
							},
							{ overwrite: true },
							function(err, survey) {
								if (err) {
									res.status(400).send(err);
								} else {
									res.status(200).send("Survey Updated!");
								}
							}
						);
					}
				}
			);
		} catch (err) {
			res.status(403).send(err);
		}
	});
};
