import React from 'react';
import { connect } from 'react-redux';

import { determineButtonToggled } from './actions/actions';

class App extends React.Component {

  render() {
    return (
      <div>
        <div className="title">Zelp</div>
      	<button onClick={() => {this.props.determineButtonToggled(this.props.appState.button_toggled)}}>{this.props.appState.button_toggled}</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    determineButtonToggled: (button_toggled) => dispatch(determineButtonToggled(button_toggled))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
