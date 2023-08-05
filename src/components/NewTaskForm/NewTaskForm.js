import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ saveTodo }) => {
  // состояния
  const [label, setLabel] = useState('');
  const [id, setId] = useState(100);
  const [sec, setSec] = useState('');
  const [min, setMin] = useState('');

  // отправка введённых данных...обновляет состояния
  const submitHandler = (event) => {
    event.preventDefault();
    saveTodo({ id, label, sec, min });
    setId(id + 1);
    setLabel('');
    setSec('');
    setMin('');
  };

  return (
    <form className={'new-todo-form'} onSubmit={submitHandler}>
      <input
        className="new-todo"
        placeholder="Task"
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => setMin(e.target.value)}
        value={min}
        type={'number'}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => setSec(e.target.value)}
        value={sec}
        type={'number'}
        autoFocus
      />
      <button type="submit" className="button__form" />
    </form>
  );
};

// проверка на тип
NewTaskForm.propTypes = {
  saveTodo: PropTypes.func,
};

export default NewTaskForm;
