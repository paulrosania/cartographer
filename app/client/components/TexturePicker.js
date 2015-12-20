import React, { Component, PropTypes } from 'react';

export default class TexturePicker extends Component {
  static propTypes = {
    tileset: PropTypes.object
  };

  render() {
    const { tileset } = this.props;

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

    return (
      <div style={containerStyle}>
        tex
      </div>
    );
  }
}
