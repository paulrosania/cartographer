import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class LayerPane extends Component {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    selectedLayer: PropTypes.number,
  };

  render() {
    const { layers, selectedLayer } = this.props;

    const paneStyle = {
      display: 'flex',
      flexDirection: 'column'
    };

    const navStyle = {
      flex: 1
    };

    const bottomBarStyle = {
      borderTop: '1px solid #ddd',
      background: 'linear-gradient(#fafaf9, #e8e8e7)',
      padding: '4px'
    };

    const layerElements = layers.map((l, i) => {
      const cns = classNames('nav-group-item', {
        active: i === selectedLayer
      });

      return (
        <a className={cns}>
          <span className="icon icon-folder"></span>
          {l.name}
        </a>
      );
    });

    return (
      <div className="pane pane-sm sidebar" style={paneStyle}>
        <nav className="nav-group" style={navStyle}>
          <h5 className="nav-group-title">Layers</h5>
          {layerElements}
        </nav>
        <div className="btn-group" style={bottomBarStyle}>
          <button className="btn btn-default">
            <span className="icon icon-plus"></span>
          </button>
          <button className="btn btn-default" disabled={true}>
            <span className="icon icon-minus"></span>
          </button>
        </div>
      </div>
    );
  }
}
