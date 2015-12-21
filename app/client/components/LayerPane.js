import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class LayerPane extends Component {
  static propTypes = {
    layers: PropTypes.object.isRequired,
    selectedLayer: PropTypes.number,
    onLayerClick: PropTypes.func,
    onLayerAdd: PropTypes.func,
    onLayerRemove: PropTypes.func
  };

  genLayerClickHandler(idx) {
    return e => {
      const layer = this.props.layers[idx];
      this.props.onLayerClick(layer, idx);
    }
  }

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
        <a className={cns} onClick={this.genLayerClickHandler(i)} key={i}>
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
          <button className="btn btn-default" onClick={this.props.onLayerAdd}>
            <span className="icon icon-plus"></span>
          </button>
          <button className="btn btn-default" disabled={layers.size === 0} onClick={this.props.onLayerRemove}>
            <span className="icon icon-minus"></span>
          </button>
        </div>
      </div>
    );
  }
}
