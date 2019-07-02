const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const addNewSurvey = mongoose.model("newSurvey");
const addCompletedSurvey = mongoose.model("completedSurvey");

module.exports = app => {
	app.post("/api/addNewSurvey", requireLogin, async (req, res) => {
		const { user, surveyId, surveyName, questionSet } = req.body;

		const surveyNew = new addNewSurvey({
			user,
			surveyId,
			surveyName,
			questionSet,
			_user: req.user.id
		});
		try {
			addNewSurvey.findOne(
				{
					surveyId: surveyId,
					_user: req.user.id
				},
				function(err, survey) {
					if (!survey) {
						surveyNew.save();
						res.status(200).send("Survey created!");
					} else {
						res.status(403).send(err);
					}
				}
			);
		} catch (err) {
			res.status(403).send(err);
		}
	});

	app.get("/api/allSurveys", async (req, res) => {
		const allSurveys = await addNewSurvey.find({});
		res.send(allSurveys);
	});

	app.get("/api/mySurveys", async (req, res) => {
		const mySurveys = await addNewSurvey.find({ _user: req.user.id });
		res.send(mySurveys);
	});

	app.post("/api/completedSurveys", requireLogin, async (req, res) => {
		const { surveyId } = req.body;
		const completedSurveys = await addCompletedSurvey.find({
			surveyId
		});
		res.send(completedSurveys);
	});

	app.post("/api/completedUserSurvey", requireLogin, async (req, res) => {
		const { surveyId, userId } = req.body;
		const completedUserSurvey = await addCompletedSurvey.find({
			surveyId,
			_user: userId
		});
		res.send(completedUserSurvey);
	});

	app.post("/api/survey", requireLogin, async (req, res) => {
		const { surveyId } = req.body;
		const survey = await addNewSurvey.findOne({
			surveyId: surveyId
		});
		res.send(survey);
	});

	app.post("/api/addCompletedSurvey", requireLogin, async (req, res) => {
		const { user, surveyId, surveyName, answers } = req.body;

		const completedNew = new addCompletedSurvey({
			user,
			surveyId,
			surveyName,
			answers,
			_user: req.user.id
		});
		try {
			addCompletedSurvey.findOne(
				{
					surveyId: surveyId,
					_user: req.user.id
				},
				function(err, survey) {
					if (!survey) {
						completedNew.save();
						res.status(200).send("Survey completed!");
					} else {
						addCompletedSurvey.replaceOne(
							{
								_user: req.user.id
							},
							{
								user,
								surveyId,
								surveyName,
								answers,
								_user: req.user.id
							},
							{ overwrite: true },
							function(err, survey) {
								if (err) {
									res.status(400).send(err);
								} else {
									res.status(200).send("Survey Completed!");
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
