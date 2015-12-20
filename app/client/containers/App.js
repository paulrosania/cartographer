import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectTile, highlightTile } from '../actions/map';
import { layerAdd, layerRemove, layerClick } from '../actions/layers';
import LayerPane from '../components/LayerPane';
import Inspector from '../components/Inspector';
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

  handleLayerAdd() {
    const { dispatch } = this.props;
    dispatch(layerAdd());
  }

  handleLayerRemove() {
    const { dispatch } = this.props;
    dispatch(layerRemove());
  }

  handleLayerClick(l, i) {
    const { dispatch } = this.props;
    dispatch(layerClick(l, i));
  }

  render() {
    const { map } = this.props;
    const { width, height, tileWidth, tileHeight,
            selectedTile, highlightedTile,
            layers, tileset } = map;

    return (
      <div className="pane-group" style={{backgroundColor: "#222222"}}>
        <LayerPane layers={layers} selectedLayer={0}
          onLayerAdd={this.handleLayerAdd.bind(this)}
          onLayerRemove={this.handleLayerRemove.bind(this)}
          onLayerClick={this.handleLayerClick.bind(this)}
          />
        <div className="pane">
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
        <Inspector tile={selectedTile} tileset={tileset} />
      </div>
    );
  }
}
