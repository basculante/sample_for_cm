import { FETCH_MY_COMPLETED_SURVEYS } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_MY_COMPLETED_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}
