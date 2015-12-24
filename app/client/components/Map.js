import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import ReactART, { Group, Path, Pattern, Shape, Surface } from 'react-art';

const CLICK_DELAY = 250 /* ms */;
const CAMERA_PADDING_X = 10;
const CAMERA_PADDING_Y = 40;

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      bounds: {},
      camera: {
        x: -CAMERA_PADDING_X,
        y: -CAMERA_PADDING_Y
      },
      dragStart: 0,
      dragOrigin: null,
      selectedTile: null
    };
  }

  static defaultProps = {
    onClick: function() {}
  };

  static propTypes = {
    layers: PropTypes.object.isRequired,
    tileset: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tileWidth: PropTypes.number.isRequired,
    tileHeight: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    selectedTile: PropTypes.object
  };

  getBounds() {
    return ReactDOM.findDOMNode(this).getBoundingClientRect();
  }

  updateDimensions() {
    const bounds = this.getBounds();

    this.setState({
      bounds
    }, this.updateClipRegion);
  }

  updateClipRegion(bounds) {
    bounds = bounds || this.state.bounds;
    const xmin = Math.max(0, this.screen2map(0, 0).x);
    const ymin = Math.max(0, this.screen2map(bounds.width, 0).y);
    const xmax = Math.min(this.props.width - 1, this.screen2map(bounds.width, bounds.height).x);
    const ymax = Math.min(this.props.height - 1, this.screen2map(0, bounds.height).y);

    this.setState({
      xmin, ymin, xmax, ymax
    });
  }

  centerCamera() {
    const bounds = this.getBounds();
    const { tileWidth, height } = this.props;
    const { camera } = this.state;
    const cx = (tileWidth * height - bounds.width) / 2;
    this.setState({
      camera: {
        x: cx,
        y: camera.y
      }
    });
  }

  componentDidMount() {
    const { bounds, camera } = this.state;
    const mouseMove = this.handleMouseMove.bind(this);
    const mouseUp = this.handleMouseUp.bind(this);
    this.setState({
      mouseMove,
      mouseUp
    });
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('resize', this.updateDimensions.bind(this));

    this.updateDimensions();
    this.centerCamera();
    this.updateClipRegion(this.getBounds());
  }

  componentWillUnmount() {
    const { mouseMove, mouseUp } = this.state;
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }

  render() {
    const { bounds } = this.state;
    const { width, height } = bounds;

    const containerStyle = {
      height: '100%',
      overflow: 'hidden'
    }

    return (
      <div style={containerStyle}>
        <div onMouseDown={this.handleMouseDown.bind(this)}>
          <Surface
            width={width}
            height={height}>
            {this.renderFrame()}
          </Surface>
        </div>
      </div>
    );
  }

  handleMouseMove(e) {
    const { camera, dragStart, dragOrigin, bounds } = this.state;
    const { width, height } = this.props;
    const x = e.pageX - bounds.left;
    const y = e.pageY - bounds.top;
    const pt = this.screen2map(x, y);
    let tile = null;
    if (pt.x >= 0 && pt.y >= 0 && pt.x < width && pt.y < height) {
      tile = pt;
    }

    if (dragStart) {
      const { tileWidth, tileHeight, width, height } = this.props;
      const mapWidth = tileWidth * (width + height) / 2;
      const mapHeight = tileHeight * (width + height) / 2;

      let cx = camera.x + dragOrigin.x - x;
      let cy = camera.y + dragOrigin.y - y;

      if (cx < -CAMERA_PADDING_X) {
        cx = -CAMERA_PADDING_X;
      } else if (cx > mapWidth + CAMERA_PADDING_X - this.state.bounds.width) {
        cx = mapWidth + CAMERA_PADDING_X - this.state.bounds.width;
      }

      if (cy < -CAMERA_PADDING_Y) {
        cy = -CAMERA_PADDING_Y;
      } else if (cy > mapHeight + CAMERA_PADDING_Y - this.state.bounds.height) {
        cy = mapHeight + CAMERA_PADDING_Y - this.state.bounds.height;
      }

      this.setState({
        dragOrigin: { x, y },
        camera: {
          x: cx,
          y: cy
        }
      });

      this.updateClipRegion();
    }

    this.setState({
      highlightedTile: tile
    });
  }

  handleMouseDown(e) {
    const bounds = e.target.getBoundingClientRect();
    const x = e.pageX - bounds.left;
    const y = e.pageY - bounds.top;

    this.setState({
      dragStart: Date.now(),
      dragOrigin: { x, y }
    });
  }

  handleMouseUp(e) {
    const interval = Date.now() - this.state.dragStart;
    if (interval < CLICK_DELAY) {
      this.handleMouseClick(e);
    }

    this.setState({
      dragStart: 0,
      dragOrigin: null
    });
  }

  handleMouseClick(e) {
    const { width, height, onClick } = this.props;
    const bounds = e.target.getBoundingClientRect();
    const x = e.pageX - bounds.left;
    const y = e.pageY - bounds.top;
    const pt = this.screen2map(x, y);
    if (pt.x >= 0 && pt.y >= 0 && pt.x < width && pt.y < height) {
      e.tile = pt;
    } else {
      e.tile = null;
    }
    onClick(e);
  }

  screen2map(x, y) {
    const { camera } = this.state;
    const { height, tileWidth, tileHeight } = this.props;
    const x0 = -camera.x + tileWidth * height / 2;
    const y0 = -camera.y;
    const ix = (x - x0) * 2 / tileWidth;
    const iy = (y - y0) * 2 / tileHeight;

    return {
      x: Math.floor(iy / 2 + ix / 2),
      y: Math.floor(iy / 2 - ix / 2)
    };
  }

  map2screen(x, y) {
    const { camera } = this.state;
    const { height, tileWidth, tileHeight } = this.props;
    const x0 = -camera.x + tileWidth * height / 2;
    const y0 = -camera.y;
    return {
      x: x0 + (x - y) * tileWidth / 2,
      y: y0 + (x + y) * tileHeight / 2
    };
  }

  renderTileBorder(x, y, stroke) {
    const { tileWidth, tileHeight } = this.props;
    const left = this.map2screen(x, y + 1);
    const top  = this.map2screen(x, y);

    const path = new Path()
      .moveTo(tileWidth / 2, 0)
      .lineTo(tileWidth, tileHeight / 2)
      .lineTo(tileWidth / 2, tileHeight)
      .lineTo(0, tileHeight / 2)
      .close()
      .moveTo(0, 0);

    const key = x+'-'+y+'-'+stroke;

    return (
      <Shape stroke={stroke} d={path} x={left.x} y={top.y} key={key} />
    );
  }

  renderTileFill(x, y, color) {
    const { tileWidth, tileHeight } = this.props;
    const left = this.map2screen(x, y + 1);
    const top  = this.map2screen(x, y);

    const path = new Path()
      .moveTo(tileWidth / 2, 0)
      .lineTo(tileWidth, tileHeight / 2)
      .lineTo(tileWidth / 2, tileHeight)
      .lineTo(0, tileHeight / 2)
      .close()
      .moveTo(0, 0);

    const key = x+'-'+y+'-'+color;

    return (
      <Shape fill={color} d={path} x={left.x} y={top.y} key={key} />
    );
  }

  renderTileTexture(x, y, texId) {
    const { tileWidth, tileHeight, tileset } = this.props;
    const tex = tileset.tiles.get(texId);
    const bottom = this.map2screen(x + 1, y + 1);

    const path = new Path()
      .moveTo(0, 0)
      .lineTo(tex.width, 0)
      .lineTo(tex.width, tex.height)
      .lineTo(0, tex.height)
      .close()
      .moveTo(0, 0);

    const key = 'tex-'+x+'-'+y;
    const pattern = new Pattern(tex.path, tex.width, tex.height, 0, 0);
    const pos = {
      x: bottom.x - tex.width / 2,
      y: bottom.y - tex.height
    };

    return (
      <Shape fill={pattern} d={path} x={pos.x} y={pos.y} key={key} />
    );
  }

  renderGrid() {
    var tiles = [];
    const { xmin, ymin, xmax, ymax } = this.state;

    for (var x = xmin; x <= xmax; x++) {
      for (var y = ymin; y <= ymax; y++) {
        tiles.push(this.renderTileBorder(x, y, "#888888"));
      }
    }

    return (
      <Group>
        {tiles}
      </Group>
    );
  }

  renderSelection() {
    var tiles = [];

    const { selectedTile } = this.props;
    const { highlightedTile } = this.state;

    if (highlightedTile) {
      tiles.push(this.renderTileFill(highlightedTile.x, highlightedTile.y, "#ffff0055"));
    }

    if (selectedTile) {
      tiles.push(this.renderTileFill(selectedTile.x, selectedTile.y, "#ffffff55"));
    }


    return (
      <Group>
        {tiles}
      </Group>
    );
  }

  renderLayers() {
    const { layers } = this.props;
    return (
      <Group>
        {layers.layers.map(this.renderLayer.bind(this))}
      </Group>
    );
  }

  renderLayer(layer) {
    var tiles = [];
    const { xmin, ymin, xmax, ymax } = this.state;

    for (var x = xmin; x <= xmax; x++) {
      for (var y = ymin; y <= ymax; y++) {
        const tex = layer.tiles.getIn([x, y, 'tex']);
        if (typeof tex === "number") {
          tiles.push(this.renderTileTexture(x, y, tex));
        }
      }
    }

    return (
      <Group key={layer.name}>
        {tiles}
      </Group>
    );
  }

  renderFrame() {
    return (
      <Group>
        {this.renderGrid()}
        {this.renderLayers()}
        {this.renderSelection()}
      </Group>
    );
  }
}
