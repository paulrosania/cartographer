import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import PropertyList from './PropertyList';
import TexturePicker from './TexturePicker';

@Radium
export default class Inspector extends Component {
  static propTypes = {
    tileset: PropTypes.object,
    tile: PropTypes.object,
    tilePropertiesSelectedIndex: PropTypes.number,
    onTileClick: PropTypes.func.isRequired,
    onPropertyAddClick: PropTypes.func.isRequired,
    onPropertyRemoveClick: PropTypes.func.isRequired,
    onPropertyChange: PropTypes.func.isRequired,
    onPropertySelect: PropTypes.func.isRequired,
    onTextureAddClick: PropTypes.func.isRequired,
    onTextureRemoveClick: PropTypes.func.isRequired
  };

  handlePropertyRemoveClick() {
    const { tilePropertySelectedIndex, onPropertyRemove } = this.props;
    onPropertyRemove(tilePropertySelectedIndex);
  }

  handleTextureRemoveClick() {
    const { tileset, onTextureRemoveClick } = this.props;
    onTextureRemoveClick(tileset.selectedIndex);
  }

  render() {
    const { tile, tileset, properties, tilePropertiesSelectedIndex,
      onTileClick, onPropertyAddClick, onPropertyChange, onPropertySelect,
      onTextureAddClick } = this.props;

    const sectionStyle = {
    };

    const firstHeaderStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '3px 6px',
      margin: 0,
      color: '#666',
      borderBottom: '1px solid #ddd',
      background: 'linear-gradient(to right, #fdfdfc, #f4f4f5)',
    };

    const sectionHeaderStyle = Object.assign({}, firstHeaderStyle, {
      borderTop: '1px solid #ddd'
    });

    const actionStyle = {
      cursor: 'pointer',
      padding: '1px 5px',
      margin: '0 1px',
      ':hover': {
        borderRadius: '3px',
        background: '#dcdfe1'
      }
    };

    return (
      <div className="pane pane-sm sidebar">
        <section style={sectionStyle}>
          <h5 style={firstHeaderStyle}>
            Properties
            <div style={{float: 'right'}}>
              <a key="prop-add" style={actionStyle} className="icon icon-plus" onClick={onPropertyAddClick}></a>
              <a key="prop-remove" style={actionStyle} className="icon icon-minus" onClick={this.handlePropertyRemoveClick.bind(this)}></a>
            </div>
          </h5>
          <PropertyList
            properties={properties}
            selectedIndex={tilePropertiesSelectedIndex}
            onChange={onPropertyChange}
            onSelect={onPropertySelect} />
        </section>
        <section style={sectionStyle}>
          <h5 style={sectionHeaderStyle}>
            Texture
            <div style={{float: 'right'}}>
              <a key="tex-add" style={actionStyle} className="icon icon-plus" onClick={onTextureAddClick}></a>
              <a key="tex-remove" style={actionStyle} className="icon icon-minus" onClick={this.handleTextureRemoveClick.bind(this)}></a>
            </div>
          </h5>
          <TexturePicker tileset={tileset}
            onTileClick={onTileClick} />
        </section>
      </div>
    );
  }
}
