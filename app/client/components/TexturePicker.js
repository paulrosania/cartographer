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
      const t = this.props.tileset.tiles.get(i);
      this.props.onTileClick(t);
    };
  }

  render() {
    const { tileset } = this.props;
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

      return (
        <div style={cellStyle} key={i} onClick={this.genTileClickHandler(i)}>
          <img src={t.path} style={imageStyle} />
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
