export const SELECT_PROPERTY = 'SELECT_PROPERTY';
export function selectProperty(index) {
  return {
    type: SELECT_PROPERTY,
    index
  };
}

export const ADD_PROPERTY = 'ADD_PROPERTY';
export function addProperty() {
  return {
    type: ADD_PROPERTY
  }
}

export const REMOVE_PROPERTY = 'REMOVE_PROPERTY';
export function removeProperty(index) {
  return {
    type: REMOVE_PROPERTY,
    index
  }
}

export const PROPERTY_CHANGE = 'PROPERTY_CHANGE';
export function propertyChange(properties) {
  return {
    type: PROPERTY_CHANGE,
    properties
  }
}

export default {
  addProperty,
  removeProperty,
  selectProperty,
  propertyChange
};
