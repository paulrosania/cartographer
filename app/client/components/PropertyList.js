import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

function coerce(str) {
  if (str === '') {
    return null;
  } else if (!isNaN(str)) {
    return Number(str);
  } else {
    return str;
  }
}

export default class PropertyList extends Component {
  static propTypes = {
    properties: PropTypes.object,
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      editing: null,
      editValue: null
    };
  }

  genClickHandler(i) {
    return (e) => {
      this.props.onSelect(i);
    };
  }

  handleKeyKeyUp(e) {
    if (e.key === 'Escape') {
      this.setState({
        editing: null,
        editValue: null
      });
    } else if (e.key === 'Enter') {
      this.handleKeySubmit();
    }
  }

  handleEditValueChange(e) {
    this.setState({
      editValue: e.target.value
    });
  }

  handleKeySubmit() {
    this.setState({
      editing: null,
      editValue: null
    });

    const { selectedIndex, onChange } = this.props;
    const { editValue: newKey } = this.state;
    const properties = this.props.properties || {};
    const keys = _.sortBy(Object.keys(properties));
    const oldKey = selectedIndex < keys.length ? keys[selectedIndex] : null;
    const value = properties[oldKey];
    let newProperties = Object.assign({}, properties, {
      [newKey]: value
    });
    delete newProperties[oldKey];
    onChange(newProperties);
  }

  handleValueKeyUp(e) {
    if (e.key === 'Escape') {
      this.setState({
        editing: null,
        editValue: null
      });
    } else if (e.key === 'Enter') {
      this.handleValueSubmit();
    }
  }

  handleValueSubmit() {
    this.setState({
      editing: null,
      editValue: null
    });

    const { selectedIndex, onChange } = this.props;
    const properties = this.props.properties || {};
    const keys = _.sortBy(Object.keys(properties));
    const key = selectedIndex < keys.length ? keys[selectedIndex] : null;
    const newValue = coerce(this.state.editValue);
    const newProperties = Object.assign({}, properties, {
      [key]: newValue
    });
    onChange(newProperties);
  }

  handleKeyDoubleClick() {
    const { selectedIndex } = this.props;
    const properties = this.props.properties || {};
    const keys = _.sortBy(Object.keys(properties));
    const key = selectedIndex < keys.length ? keys[selectedIndex] : null;

    this.setState({
      editing: 'key',
      editValue: key
    });
  }

  handleValueDoubleClick() {
    const { selectedIndex } = this.props;
    const properties = this.props.properties || {};
    const keys = _.sortBy(Object.keys(properties));
    const key = selectedIndex < keys.length ? keys[selectedIndex] : null;
    const value = properties[key];

    this.setState({
      editing: 'value',
      editValue: value
    });
  }

  handleInputBlur() {
    this.setState({
      editing: null
    });
  }

  render() {
    const { selectedIndex } = this.props;
    const { editing, editValue } = this.state;
    const properties = this.props.properties || {};

    const selectedRowStyle = {
      backgroundColor: '#116cd6',
      color: '#fff'
    };

    const cellStyle = {
      height: '1em',
      width: '50%'
    };

    const inputStyle = {
      color: '#000',
      margin: 0,
      width: '100%',
    };

    const handleKeyDoubleClick = this.handleKeyDoubleClick.bind(this);
    const handleValueDoubleClick = this.handleValueDoubleClick.bind(this);
    const handleKeyKeyUp = this.handleKeyKeyUp.bind(this);
    const handleValueKeyUp = this.handleValueKeyUp.bind(this);
    const handleEditValueChange = this.handleEditValueChange.bind(this);
    const handleInputBlur = this.handleInputBlur.bind(this);

    const keys = _.sortBy(Object.keys(properties)).concat('');
    const rows = keys.map((key, i) => {
      const value = properties[key];
      const selected = selectedIndex === i;
      const rowStyle = selected ? selectedRowStyle : null;
      const rowKey = key;
      const keyKey = key + "Key";
      const valueKey = key + "Value";

      var keyCell = (<td style={cellStyle} onDoubleClick={handleKeyDoubleClick}>{key}</td>);
      var valueCell = (<td style={cellStyle} onDoubleClick={handleValueDoubleClick}>{value}</td>);

      if (selected && editing === 'key') {
        var keyCell = (
          <td style={cellStyle}>
            <input type="text"
              autoFocus
              value={editValue}
              style={inputStyle}
              onChange={handleEditValueChange}
              onKeyUp={handleKeyKeyUp}
              onBlur={handleInputBlur}/>
          </td>
        );
      }

      if (selected && editing === 'value') {
        var valueCell = (
          <td style={cellStyle}>
            <input type="text"
              autoFocus
              value={editValue}
              style={inputStyle}
              onChange={handleEditValueChange}
              onKeyUp={handleValueKeyUp}
              onBlur={handleInputBlur}/>
          </td>
        );
      }

      return (
        <tr key={rowKey} style={rowStyle} onClick={this.genClickHandler(i)}>
          {keyCell}
          {valueCell}
        </tr>
      );
    });

    const tableStyle = {
    };

    return (
      <table className="table-striped" style={tableStyle}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}
