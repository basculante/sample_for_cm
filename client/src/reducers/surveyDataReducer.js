import { FETCH_SURVEY_DATA } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SURVEY_DATA:
			return action.payload;
		default:
			return state;
	}
}
