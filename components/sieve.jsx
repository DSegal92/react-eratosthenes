import React from 'react';
import ReactDOM from 'react-dom';
import { Map, List } from 'immutable';
import $ from 'jquery';
import { getPrimes } from '../src/sieve';
import classNames from 'classnames';

var Number = React.createClass({
  special: function() {
    if (this.props.integer == 0 || this.props.integer == 1) {
      return true;
    }
  },
  render: function() {
    var testClass = classNames({
      'number': true,
      'prime': this.props.is_prime,
      'not-prime': !this.props.is_prime,
      'special': this.special()
    });
    return (
      <div className={testClass}>
        { this.props.integer }
      </div>
    );
  }
})

var Sieve = React.createClass({
  getInitialState: function() {
    return { sieve: [], hello: '' };
  },
  componentDidMount: function() {
    $.ajax({
      url: 'http://localhost:3000/sieve',
      cache: false,
      success: function(data) {
        this.setState({ sieve: getPrimes(data["upper_limit"]).toJS() });
        this.setState({ hello: 'world'})
        console.log(JSON.stringify(this.state.sieve))
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
        { this.state.sieve.map(function(v, index) {
          return <Number key={index} is_prime={v} integer={index}/>
        })}
      </div>
    );
  }
})

ReactDOM.render(<Sieve />, document.getElementById('sieve'));
