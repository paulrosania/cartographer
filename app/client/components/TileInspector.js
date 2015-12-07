import React, { Component, PropTypes } from 'react';

export default class TileInspector extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired
  }

  render() {
    const { x, y, visible } = this.props;
    const style = {
      background: '#fff',
      position: 'absolute',
      left: x,
      top: y,
      display: visible ? 'block' : 'none'
    }

    return (
      <div style={style}>
        hello
      </div>
    );
  }
}
