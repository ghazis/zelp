import React from 'react';
import { connect } from 'react-redux';
import Autocomplete from 'react-google-autocomplete';

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
        <td><a href={row.url} target="_blank">Yelp Reviews</a></td>
      </tr>
    );

    const Tb = ({data}) => (
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
            {data.map((result, index) =>{
              return <Row key={index} row={result} />;
            })}
          </tbody>
        </table>
    );

    this.results = typeof this.props.results === 'string' ?
      <div>{this.props.results}</div> :
      <Tb data={this.props.results} />

    return (
      <div>
        <div className="title">Zelp</div>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.getZelpReviews(this.props.location);
        }}>
          <Autocomplete
            onPlaceSelected={e => this.props.setLocation(e.formatted_address)}
            types={['address']}
          />
        	<button>Search</button>
        </form>
        {this.results}
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