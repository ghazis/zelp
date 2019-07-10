import { combineReducers } from 'redux';

const initialState = {
   button_toggled: "Off"
}

export function appState(state = initialState, action) {
	switch (action.type) {
		case 'BUTTON_TOGGLED':
			return {
				...state,
					button_toggled: action.button_toggled
			}
		default:
			return state;
	}
}

export default combineReducers({
   appState
});