export function setIsLoading(isLoading) {
	return {
		type: 'IS_LOADING_SET',
		isLoading: isLoading
	};
}

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
		if (location) {
			dispatch(setIsLoading(true));
			dispatch(setResults([]));
			fetch('http://localhost:3000/zelp?location='+location)
				.then(response => response.json())
				.then(results=>{
					var error;
					results.map(result=>{
						if (Object.keys(result).includes('error')) {
							error = result['error'];
						}
					})
					results = error ? error : results;
					dispatch(setResults(results));
					dispatch(setIsLoading(''));
					dispatch(setLocation(false));
			});
		}
	}
}