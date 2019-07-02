import axios from "axios";
import history from "../history";
import {
	FETCH_USER,
	FETCH_ALL_SURVEYS,
	FETCH_MY_SURVEYS,
	FETCH_SURVEY,
	FETCH_COMPLETED_SURVEYS,
	FETCH_COMPLETED_USER_SURVEY,
	CREATE_SURVEY
} from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const createNewSurvey = (
	user,
	id,
	surveyName,
	questions
) => async dispatch => {
	const res = await axios.post("/api/addNewSurvey", {
		user: user,
		surveyId: id,
		surveyName: surveyName,
		questionSet: questions
	});

	dispatch({ type: CREATE_SURVEY, payload: res.data });
};

export const fetchAllSurveys = () => async dispatch => {
	const res = await axios.get("/api/allSurveys");

	dispatch({ type: FETCH_ALL_SURVEYS, payload: res.data });
};

export const fetchMySurveys = () => async dispatch => {
	const res = await axios.get("/api/mySurveys");

	dispatch({ type: FETCH_MY_SURVEYS, payload: res.data });
};

export const fetchSurvey = surveyId => async dispatch => {
	const res = await axios.post("/api/survey", { surveyId });

	dispatch({ type: FETCH_SURVEY, payload: res.data });
};

export const fetchCompletedSurveys = surveyId => async dispatch => {
	const res = await axios.post("/api/completedSurveys", { surveyId });

	dispatch({ type: FETCH_COMPLETED_SURVEYS, payload: res.data });
};

export const fetchCompletedUserSurvey = (
	surveyId,
	userId
) => async dispatch => {
	const res = await axios.post("/api/completedUserSurvey", {
		surveyId,
		userId
	});

	dispatch({ type: FETCH_COMPLETED_USER_SURVEY, payload: res.data });
};

export const completeSurvey = (
	user,
	surveyId,
	surveyName,
	answers
) => async dispatch => {
	await axios.post("/api/addCompletedSurvey", {
		user,
		surveyId,
		surveyName,
		answers
	});

	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
	history.push("/");
};
