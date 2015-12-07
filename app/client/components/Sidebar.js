import React, { Component, PropTypes } from 'react';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="pane-sm sidebar">
        <h5 className="nav-group-title">Layers</h5>
        <table className="table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Layer 0</td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
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
