import { CREATE_SURVEY } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case CREATE_SURVEY:
			return action.payload;
		default:
			return state;
	}
}
