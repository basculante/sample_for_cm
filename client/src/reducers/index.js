import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import surveyDataReducer from "./surveyDataReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	survey: surveyReducer,
	surveyData: surveyDataReducer
});
