import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import TexturePicker from './TexturePicker';

@Radium
export default class Inspector extends Component {
  static propTypes = {
    tileset: PropTypes.object,
    tile: PropTypes.object,
    onTileClick: PropTypes.func.isRequired,
    onTextureAddClick: PropTypes.func.isRequired,
    onTextureRemoveClick: PropTypes.func.isRequired
  };

  handleTextureRemoveClick() {
    const { tileset, onTextureRemoveClick } = this.props;
    onTextureRemoveClick(tileset.selectedIndex);
  }

  render() {
    const { tile, tileset, onTileClick,
            onTextureAddClick, onTextureRemoveClick } = this.props;

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
      margin: '2px 0 0',
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
          <h5 style={firstHeaderStyle}>Properties</h5>
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
