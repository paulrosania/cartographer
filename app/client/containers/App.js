import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectTile, highlightTile } from '../actions/map';
import { layerAdd, layerRemove, layerClick } from '../actions/layers';
import { tilesetTileAdd, tilesetTileRemoveSelected } from '../actions/tileset';
import { tileSetTexture } from '../actions/tiles';
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

  handleTextureAddClick() {
    const { dispatch } = this.props;
    dispatch(tilesetTileAdd());
  }

  handleTextureRemoveClick() {
    const { dispatch } = this.props;
    dispatch(tilesetTileRemoveSelected());
  }

  handleTextureSelect(t) {
    const { dispatch, map } = this.props;
    const { selectedTile } = map;
    const { x, y } = selectedTile;
    dispatch(tileSetTexture(x, y, t.id));
  }

  render() {
    const { map } = this.props;
    const { width, height, tileWidth, tileHeight,
            selectedTile, highlightedTile,
            layers, selectedLayer, tileset } = map;

    return (
      <div className="pane-group" style={{backgroundColor: "#222222"}}>
        <LayerPane layers={layers.layers} selectedLayer={layers.selectedIndex}
          onLayerAdd={this.handleLayerAdd.bind(this)}
          onLayerRemove={this.handleLayerRemove.bind(this)}
          onLayerClick={this.handleLayerClick.bind(this)}
          />
        <div className="pane">
          <Map
            layers={layers}
            tileset={tileset}
            width={width}
            height={height}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
            selectedTile={selectedTile}
            highlightedTile={highlightedTile}
            onMouseMove={this.handleMapMove.bind(this)}
            onClick={this.handleMapClick.bind(this)} />
        </div>
        <Inspector tile={selectedTile} tileset={tileset}
          onTextureAddClick={this.handleTextureAddClick.bind(this)}
          onTextureRemoveClick={this.handleTextureRemoveClick.bind(this)}
          onTileClick={this.handleTextureSelect.bind(this)} />
      </div>
    );
  }
}
