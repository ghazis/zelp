export function setButtonToggled(button_toggled) {
	return {
		type: 'BUTTON_TOGGLED',
		button_toggled: button_toggled
	};
}

export function determineButtonToggled(current_toggle) {
	return (dispatch, getState) => {
		if (current_toggle=="On") {
			dispatch(setButtonToggled("Off"))
		} else {
			dispatch(setButtonToggled("On"));
		}
	}
}