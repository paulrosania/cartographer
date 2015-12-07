import React, { Component, PropTypes } from 'react';
import ReactART, { Group, Path, Shape, Surface } from 'react-art';

const PADDING = 1;

export default class Map extends Component {
  static defaultProps = {
  };

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tileWidth: PropTypes.number.isRequired,
    tileHeight: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  pixelWidth() {
    const { width, height, tileWidth } = this.props;
    return 2 * PADDING + tileWidth * (width + height) / 2;
  }

  pixelHeight() {
    const { width, height, tileHeight } = this.props;
    return 2 * PADDING + tileHeight * (width + height) / 2;
  }

  render() {
    return (
      <div
        onMouseMove={this.handleMouseMove.bind(this)}
        onClick={this.handleClick.bind(this)}>
        <Surface
          width={this.pixelWidth()}
          height={this.pixelHeight()}>
          {this.renderFrame()}
        </Surface>
      </div>
    );
  }

  handleMouseMove(e) {
    const { width, height } = this.props;
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const pt = this.screen2map(x, y);
    if (pt.x >= 0 && pt.y >= 0 && pt.x < width && pt.y < height) {
      this.setState(Object.assign({}, this.state, {
        hoverTile: pt
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        hoverTile: null
      }));
    }
  }

  handleClick(e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
  }

  screen2map(x, y) {
    const { width, height, tileWidth, tileHeight } = this.props;
    const x0 = PADDING + this.pixelWidth() * (height / (width + height));
    const y0 = PADDING;
    const ix = (x - x0) * 2 / tileWidth;
    const iy = (y - y0) * 2 / tileHeight;

    return {
      x: Math.floor(iy / 2 + ix / 2),
      y: Math.floor(iy / 2 - ix / 2)
    };
  }

  map2screen(x, y) {
    const { width, height, tileWidth, tileHeight } = this.props;
    const x0 = PADDING + this.pixelWidth() * (height / (width + height));
    const y0 = PADDING;
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

    const { hoverTile } = this.state;

    if (hoverTile) {
      tiles.push(this.renderTile(hoverTile.x, hoverTile.y, "#ffff00"));
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
