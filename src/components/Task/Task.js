import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Timer from '../Timer/Timer';

import EditField from './EditField';

import './Task.css';

const Task = (props) => {
  const { remove, taskCompleted, setComletedTodos, id, label, min, sec } = props;

  const taskDate = new Date();

  const [editing, setEditing] = useState(false);
  const [taskLabel, setTaskLabel] = useState(label || '');
  const [formattedCreateTime, setFormattedCreateTime] = useState(`created ${formatDistanceToNow(taskDate)} ago`);

  const classNames = [taskCompleted ? 'completed' : '', editing ? 'editing' : ''].join(' ');

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedCreateTime(`created ${formatDistanceToNow(taskDate)} ago`);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onTaskEdit = (e) => setTaskLabel(e.target.value);
  const onEditEnd = () => setEditing((editing) => !editing);
  const removeTask = () => remove(id);

  const onCompleteToggle = () => {
    if (taskCompleted === true) {
      setComletedTodos(false, id);
    } else if (taskCompleted === false) {
      setComletedTodos(true, id);
    }
  };

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={`${id}__check`}
          onChange={onCompleteToggle}
          checked={taskCompleted}
        />
        <label htmlFor={`${id}__check`}>
          <span className="title">{taskLabel}</span>
          <Timer min={Number(min)} sec={Number(sec)} />
          <span className="description">{formattedCreateTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)} />
        <button className="icon icon-destroy" onClick={() => removeTask(id)} />
      </div>

      <EditField editing={editing} onTaskEdit={onTaskEdit} onEditEnd={onEditEnd} label={taskLabel} id={id} />
    </li>
  );
};

Task.propTypes = {
  remove: PropTypes.func,
  taskCompleted: PropTypes.func,
  setComletedTodos: PropTypes.func,
  id: PropTypes.number,
  label: PropTypes.string,
  min: PropTypes.number,
  sec: PropTypes.number,
};
export default Task;
