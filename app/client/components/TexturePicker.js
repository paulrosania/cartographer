import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { default as fspath } from 'path';

@Radium
export default class TexturePicker extends Component {
  static propTypes = {
    texturePath: PropTypes.string.isRequired,
    tileset: PropTypes.object,
    onTileClick: PropTypes.func.isRequired
  };

  genTileClickHandler(i) {
    return e => {
      this.props.onTileClick(i);
    };
  }

  render() {
    const { texturePath, tileset } = this.props;
    const { tiles } = tileset;

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

    const maxWidth = 60;
    const cellStyle = {
      display: 'inline-block',
      width: maxWidth,
      margin: 2,
      padding: 2,
      ':hover': {
        background: 'yellow'
      }
    };

    const txs = tiles.map((t, i) => {
      const width = t.width > maxWidth ? 60 : t.width;
      const scale = width / t.width;
      const height = t.height * scale;
      const imageStyle = {
        width,
        height
      };
      const path = fspath.join(texturePath, t.path);

      return (
        <div style={cellStyle} key={i} onClick={this.genTileClickHandler(i)}>
          <img src={path} style={imageStyle} />
        </div>
      );
    }).toArray();

    return (
      <div style={containerStyle}>
        {txs}
      </div>
    );
  }
}
