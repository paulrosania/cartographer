import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect((state) => state)
export default class App extends Component {
  render() {
    return <div>hi!</div>;
  }
}
