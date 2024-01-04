import { GET_USERS, USERS_ERROR, SET_USERNAME } from "../types";

const initialState = {
	company: "",
	loading: true,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_USERNAME:
			return {
				...state,
				company: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
