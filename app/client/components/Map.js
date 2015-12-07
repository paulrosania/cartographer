import React, { Component, PropTypes } from 'react';
import ReactART, { Group, Path, Shape, Surface } from 'react-art';
import TileInspector from './TileInspector';

const PADDING_X = 10;
const PADDING_Y = 40;

export default class Map extends Component {
  static defaultProps = {
    onMouseMove: function() {},
    onClick: function() {}
  };

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tileWidth: PropTypes.number.isRequired,
    tileHeight: PropTypes.number.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedTile: PropTypes.object,
    highlightedTile: PropTypes.object
  };

  pixelWidth() {
    const { width, height, tileWidth } = this.props;
    return 2 * PADDING_X + tileWidth * (width + height) / 2;
  }

  pixelHeight() {
    const { width, height, tileHeight } = this.props;
    return 2 * PADDING_Y + tileHeight * (width + height) / 2;
  }

  render() {
    const { selectedTile, tileWidth, tileHeight } = this.props;
    var inspectorX = 0, inspectorY = 0;
    if (selectedTile) {
      const selectedTilePx = this.map2screen(selectedTile.x, selectedTile.y);
      inspectorX = selectedTilePx.x + tileWidth / 2 + 8;
      inspectorY = selectedTilePx.y + tileHeight / 2 - 8;
    }

    return (
      <div style={{width:"100%", height:"100%", overflow: "hidden"}}>
        <div
          onMouseMove={this.handleMouseMove.bind(this)}
          onClick={this.handleClick.bind(this)}>
          <Surface
            width={this.pixelWidth()}
            height={this.pixelHeight()}>
            {this.renderFrame()}
          </Surface>
        </div>
        <TileInspector
          x={inspectorX}
          y={inspectorY}
          visible={!!this.props.selectedTile} />
      </div>
    );
  }

  handleMouseMove(e) {
    const { width, height, onMouseMove } = this.props;
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const pt = this.screen2map(x, y);
    if (pt.x >= 0 && pt.y >= 0 && pt.x < width && pt.y < height) {
      e.tile = pt;
    } else {
      e.tile = null;
    }
    onMouseMove(e);
  }

  handleClick(e) {
    const { width, height, onClick } = this.props;
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const pt = this.screen2map(x, y);
    if (pt.x >= 0 && pt.y >= 0 && pt.x < width && pt.y < height) {
      e.tile = pt;
    } else {
      e.tile = null;
    }
    onClick(e);
  }

  screen2map(x, y) {
    const { width, height, tileWidth, tileHeight } = this.props;
    const x0 = PADDING_X + this.pixelWidth() * (height / (width + height));
    const y0 = PADDING_Y;
    const ix = (x - x0) * 2 / tileWidth;
    const iy = (y - y0) * 2 / tileHeight;

    return {
      x: Math.floor(iy / 2 + ix / 2),
      y: Math.floor(iy / 2 - ix / 2)
    };
  }

  map2screen(x, y) {
    const { width, height, tileWidth, tileHeight } = this.props;
    const x0 = PADDING_X + this.pixelWidth() * (height / (width + height));
    const y0 = PADDING_Y;
    return {
      x: x0 + (x - y) * tileWidth / 2,
      y: y0 + (x + y) * tileHeight / 2
    };
  }

  renderTile(x, y, stroke) {
    const left   = this.map2screen(x, y + 1);
    const top    = this.map2screen(x, y);
    const right  = this.map2screen(x + 1, y);
    const bottom = this.map2screen(x + 1, y + 1);

    const path = new Path()
      .moveTo(left.x,   left.y)
      .lineTo(top.x,    top.y)
      .lineTo(right.x,  right.y)
      .lineTo(bottom.x, bottom.y)
      .close()
      .moveTo(left.x, left.y);

    return (
      <Shape stroke={stroke} d={path} />
    );
  }

  renderGrid() {
    var tiles = [];

    for (var x = 0; x < this.props.width; x++) {
      for (var y = 0; y < this.props.height; y++) {
        tiles.push(this.renderTile(x, y, "#888888"));
      }
    }

    const { selectedTile, highlightedTile } = this.props;

    if (highlightedTile) {
      tiles.push(this.renderTile(highlightedTile.x, highlightedTile.y, "#ffff00"));
    }

    if (selectedTile) {
      tiles.push(this.renderTile(selectedTile.x, selectedTile.y, "#ffffff"));
    }

    return (
      <Group>
        {tiles}
      </Group>
    );
  }

  renderFrame() {
    return (
      <Group>
        {this.renderGrid()}
      </Group>
    );
  }
}
