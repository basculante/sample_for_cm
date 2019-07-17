import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import surveysListReducer from "./surveysListReducer";
import mySurveysReducer from "./mySurveysReducer";
import newSurveyReducer from "./newSurveyReducer";
import surveyReducer from "./surveyReducer";
import completedSurveysReducer from "./completedSurveysReducer";
import completedUserSurveyReducer from "./completedUserSurveyReducer";
import myCompletedSurveysReducer from "./myCompletedSurveysReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	surveys: surveysListReducer,
	mySurveys: mySurveysReducer,
	survey: surveyReducer,
	newSurvey: newSurveyReducer,
	completedSurveys: completedSurveysReducer,
	userCompletedSurvey: completedUserSurveyReducer,
	myCompletedSurveys: myCompletedSurveysReducer
});
