import React from 'react';
import { connect } from 'react-redux';

import { getZelpReviews, setLocation } from './actions/actions';

class App extends React.Component {

  render() {
    const Row = ({row}) => (
      <tr>
        <td>{row.name}</td>
        <td>{row.rating}</td>
        <td>{row.review_count}</td>
        <td>{row.phone}</td>
        <td>{row.address}</td>
        <td>{row.url}</td>
      </tr>
    )

    return (
      <div>
        <div className="title">Zelp</div>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.getZelpReviews(this.props.location);
        }}>
          <input placeholder="Enter City or Address" onChange={(e)=>this.props.setLocation(e.target.value)}/>
        	<button>Search</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Phone</th>
              <th>Address</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map((result, index) =>{
              return <Row key={index} row={result} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.appState.location,
    results: state.appState.results
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location) => dispatch(setLocation(location)),
    getZelpReviews: (location) => dispatch(getZelpReviews(location))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);