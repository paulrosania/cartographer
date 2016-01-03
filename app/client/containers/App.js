import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import { selectTile } from '../actions/map';
import { layerAdd, layerRemove, layerClick } from '../actions/layers';
import { selectProperty } from '../actions/properties';
import { tilesetTileAdd, tilesetTileRemove } from '../actions/tileset';
import { tileSetTexture, tileSetProperties, tileRemoveProperty } from '../actions/tiles';
import Header from '../components/Header';
import LayerPane from '../components/LayerPane';
import Inspector from '../components/Inspector';
import Map from '../components/Map';

@connect((state) => state)
export default class App extends Component {
  handleUndoClick() {
    const { dispatch } = this.props;
    dispatch(ActionCreators.undo());
  }

  handleRedoClick() {
    const { dispatch } = this.props;
    dispatch(ActionCreators.redo());
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

  handlePropertyAddClick() {
    const { dispatch, selectedTile } = this.props;
    if (!selectedTile) {
      return;
    }

    const map = this.props.map.present;
    const { layers } = map;
    const layer = layers.layers.get(layers.selectedIndex);
    const { x, y } = selectedTile;
    const tile = layer.tiles.getIn([x, y]);
    if (!tile) {
      return;
    }

    dispatch(selectProperty(tile.size));
  }

  handlePropertyRemoveClick(id) {
    const { dispatch, selectedTile } = this.props;
    if (!selectedTile) {
      return;
    }

    const { x, y } = selectedTile;
    dispatch(tileRemoveProperty(x, y, id));
  }

  handlePropertyChange(props) {
    const { dispatch, selectedTile } = this.props;
    if (!selectedTile) {
      return;
    }

    const { x, y } = selectedTile;
    dispatch(tileSetProperties(x, y, props));
  }

  handlePropertySelect(id) {
    const { dispatch } = this.props;
    dispatch(selectProperty(id));
  }

  handleTextureAddClick() {
    const { dispatch } = this.props;
    dispatch(tilesetTileAdd());
  }

  handleTextureRemoveClick(id) {
    const { dispatch } = this.props;
    dispatch(tilesetTileRemove(id));
  }

  handleTextureSelect(id) {
    const { dispatch, selectedTile } = this.props;
    if (!selectedTile) {
      return;
    }

    const { x, y } = selectedTile;
    dispatch(tileSetTexture(x, y, id));
  }

  render() {
    const map = this.props.map.present;
    const { selectedTile, tilePropertiesSelectedIndex } = this.props;
    const { width, height, tileWidth, tileHeight,
      layers, selectedLayer, tileset } = map;

    var properties = {};
    if (selectedTile) {
      let tile = layers.layers.get(layers.selectedIndex).tiles.getIn([selectedTile.x, selectedTile.y]);
      if (tile) {
        properties = tile.toJSON();
      }
    }

    return (
      <div className="window">
        <Header title="Cartographer"
          onUndoClick={this.handleUndoClick.bind(this)}
          onRedoClick={this.handleRedoClick.bind(this)} />
        <div className="window-content">
          <div className="pane-group" style={{backgroundColor: '#222222'}}>
            <LayerPane layers={layers.layers} selectedLayer={layers.selectedIndex}
              onLayerAdd={this.handleLayerAdd.bind(this)}
              onLayerRemove={this.handleLayerRemove.bind(this)}
              onLayerClick={this.handleLayerClick.bind(this)}
              />
            <div className="pane" style={{height: '100%'}}>
              <Map
                layers={layers}
                tileset={tileset}
                width={width}
                height={height}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                selectedTile={selectedTile}
                onClick={this.handleMapClick.bind(this)} />
            </div>
            <Inspector tile={selectedTile} tileset={tileset} properties={properties}
              tilePropertiesSelectedIndex={tilePropertiesSelectedIndex}
              onPropertyAddClick={this.handlePropertyAddClick.bind(this)}
              onPropertyRemoveClick={this.handlePropertyRemoveClick.bind(this)}
              onPropertyChange={this.handlePropertyChange.bind(this)}
              onPropertySelect={this.handlePropertySelect.bind(this)}
              onTextureAddClick={this.handleTextureAddClick.bind(this)}
              onTextureRemoveClick={this.handleTextureRemoveClick.bind(this)}
              onTileClick={this.handleTextureSelect.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
