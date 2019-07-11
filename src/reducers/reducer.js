import { combineReducers } from 'redux';

const initialState = {
	isLoading: false,
	location: '',
   results: []
}

export function appState(state = initialState, action) {
	switch (action.type) {
		case 'IS_LOADING_SET':
			return {
				...state,
					isLoading: action.isLoading
			}
		case 'LOCATION_SET':
			return {
				...state,
					location: action.location
			}
		case 'RESULTS_SET':
			return {
				...state,
					results: action.results
			}
		default:
			return state;
	}
}

export default combineReducers({
   appState
});