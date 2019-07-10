export function setLocation(location) {
	return {
		type: 'LOCATION_SET',
		location: location
	};
}

function setResults(results) {
	return {
		type: 'RESULTS_SET',
		results: results
	};
}

export function getZelpReviews(location) {
	return dispatch => {
		if (location)
			fetch('http://localhost:3000/zelp?location='+location)
				.then(response => response.json())
				.then(results=>dispatch(setResults(results)));
	}
}