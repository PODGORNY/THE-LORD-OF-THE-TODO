import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default function NewTaskForm({ onAddTask }) {
  const [label, setLabel] = useState('');
  const [minutes, setMin] = useState('');
  const [seconds, setSec] = useState('');

  // введёные данные в форму
  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  // отправляет данные с формы и...обнуляет форму
  const onSubmit = (e) => {
    e.preventDefault();
    if (label.trim()) {
      onAddTask(label.trim(), minutes, seconds);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  // значения в таймере
  const onEditMinute = (event) => {
    setMin(event.target.value);
  };

  const onEditSecond = (event) => {
    setSec(event.target.value);
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        value={label}
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        min={0}
        onChange={onEditMinute}
        value={minutes}
        autoFocus
      ></input>
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        onChange={onEditSecond}
        value={seconds}
        min={1}
        max={59}
        autoFocus
      ></input>
      <button type="submit" />
    </form>
  );
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};
