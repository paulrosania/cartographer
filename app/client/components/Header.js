import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onUndoClick: PropTypes.func,
    onRedoClick: PropTypes.func
  };

  render() {
    const { title, onUndoClick, onRedoClick } = this.props;

    return (
      <header className="toolbar toolbar-header">
        <h1 className="title">{title}</h1>
        <div className="toolbar-actions">
          <div className="btn-group">
            <button className="btn btn-default" onClick={onUndoClick}>
              <span className="icon icon-ccw"></span>
            </button>
            <button className="btn btn-default" onClick={onRedoClick}>
              <span className="icon icon-cw"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }
}
