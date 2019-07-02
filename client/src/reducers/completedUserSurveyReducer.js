import { FETCH_COMPLETED_USER_SURVEY } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_COMPLETED_USER_SURVEY:
			return action.payload;
		default:
			return state;
	}
}
