import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectTile, highlightTile } from '../actions/map';
import Map from '../components/Map';

@connect((state) => state)
export default class App extends Component {
  handleMapMove(e) {
    const { dispatch } = this.props;
    dispatch(highlightTile(e.tile));
  }

  handleMapClick(e) {
    const { dispatch } = this.props;
    dispatch(selectTile(e.tile));
  }

  render() {
    const { map } = this.props;
    const { selectedTile, highlightedTile } = map;

    return (
      <div style={{backgroundColor: "#000000"}}>
        <Map
          width={8}
          height={8}
          tileWidth={100}
          tileHeight={50}
          selectedTile={selectedTile}
          highlightedTile={highlightedTile}
          onMouseMove={this.handleMapMove.bind(this)}
          onClick={this.handleMapClick.bind(this)} />
      </div>
    );
  }
}
