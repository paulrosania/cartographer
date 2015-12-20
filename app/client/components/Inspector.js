import React, { Component, PropTypes } from 'react';

export default class Inspector extends Component {
  render() {
    const sectionStyle = {
    };

    const firstHeaderStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '3px 6px',
      margin: '0 0 2px',
      color: '#666',
      borderBottom: '1px solid #ddd',
      background: 'linear-gradient(to right, #fdfdfc, #f4f4f5)',
    };

    const sectionHeaderStyle = Object.assign({}, firstHeaderStyle, {
      borderTop: '1px solid #ddd'
    });

    return (
      <div className="pane pane-sm sidebar">
        <section style={sectionStyle}>
          <h5 style={firstHeaderStyle}>Properties</h5>
        </section>
        <section style={sectionStyle}>
          <h5 style={sectionHeaderStyle}>Texture</h5>
        </section>
      </div>
    );
  }
}
