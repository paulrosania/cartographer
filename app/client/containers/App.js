import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Map from '../components/Map';

@connect((state) => state)
export default class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#000000"}}>
        <Map width={8} height={8} tileWidth={100} tileHeight={50} />
      </div>
    );
  }
}
