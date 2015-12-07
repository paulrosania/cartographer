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
    const { width, height, tileWidth, tileHeight,
            selectedTile, highlightedTile } = map;

    return (
      <div style={{backgroundColor: "#222222"}}>
        <Map
          width={width}
          height={height}
          tileWidth={tileWidth}
          tileHeight={tileHeight}
          selectedTile={selectedTile}
          highlightedTile={highlightedTile}
          onMouseMove={this.handleMapMove.bind(this)}
          onClick={this.handleMapClick.bind(this)} />
      </div>
    );
  }
}
