import React from 'react';
import PropTypes from 'prop-types';

const EditField = (props) => {
  const { onEditEnd, editing, label, onTaskEdit, id } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    onEditEnd(label, id);
  };

  if (editing) {
    return (
      <form onSubmit={onSubmitHandler}>
        <input type="text" className="edit" value={label} onChange={onTaskEdit} autoFocus />
      </form>
    );
  }

  return null;
};


EditField.propTypes = {
  onEditEnd: PropTypes.func, 
  editing: PropTypes.bool, 
  label: PropTypes.string, 
  onTaskEdit: PropTypes.func, 
  id: PropTypes.number
}

export default EditField;