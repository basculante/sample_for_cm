import axios from "axios";
import history from "../history";
import { FETCH_USER, FETCH_SURVEY, FETCH_SURVEY_DATA } from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurvey = () => async dispatch => {
	const res = await axios.get("../surveyList.json");

	dispatch({ type: FETCH_SURVEY, payload: res.data });
};

export const addSurvey = (
	question1,
	question2,
	question3,
	question4,
	question5,
	surveyId
) => async dispatch => {
	const res = await axios.post("/api/addSurvey", {
		surveyId,
		question1,
		question2,
		question3,
		question4,
		question5
	});

	dispatch({ type: FETCH_USER, payload: res.data });
	history.push("/graph");
};

export const fetchSurveyData = () => async dispatch => {
	const res = await axios.get("/api/survey");

	dispatch({ type: FETCH_SURVEY_DATA, payload: res.data });
};
