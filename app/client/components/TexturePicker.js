import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class TexturePicker extends Component {
  static propTypes = {
    tileset: PropTypes.object,
    onTileClick: PropTypes.func.isRequired
  };

  genTileClickHandler(i) {
    return e => {
      const t = this.props.tileset.tiles[i];
      this.props.onTileClick(t);
    };
  }

  render() {
    const { tileset } = this.props;
    const { tiles, tileWidth, tileHeight } = tileset;

    const containerStyle = {
      padding: '2px 4px'
    };

    if (tileset === null) {
      return (
        <div style={containerStyle}>
          No tileset
        </div>
      );
    }

    const cellStyle = {
      display: 'inline-block',
      margin: 2,
      padding: 2,
      ':hover': {
        background: 'yellow'
      }
    };

    const width = 60;
    const scale = width / tileWidth;
    const height = tileHeight * scale;
    const imageStyle = {
      width,
      height
    };

    const txs = tiles.map((t, i) => {
      return (
        <div style={cellStyle} key={i} onClick={this.genTileClickHandler(i)}>
          <img src={t.path} style={imageStyle} />
        </div>
      );
    });

    return (
      <div style={containerStyle}>
        {txs}
      </div>
    );
  }
}
