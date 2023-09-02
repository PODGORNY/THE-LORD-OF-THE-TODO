import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';

import './Task.css';

export default function Task(props) {
  const {
    complete,
    edit,
    id,
    title,
    createTime,
    onComplete,
    onEditTaskInput,
    onEditTaskOutput,
    onDeleted,
    startTimer,
    pauseTimer,
    minutes,
    seconds,
  } = props;

  const [taskLabel, setTaskLabel] = useState(title);

  // описание задачи
  const onTaskEdit = (e) => {
    setTaskLabel(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // изменение задачи...запись отредактированных данных
    if (taskLabel.trim() || e.key === 'Escape') {
      onEditTaskOutput(taskLabel.trim(), id);
    }
  };

  // клик в сторону - форма редактирования закрылась
  // аналогично можно сделать и любую кнопку например
  const onBlurClick = () => {
    setTaskLabel(title);
    onEditTaskOutput(title, id);
  };

  // выбор класса в разметку
  // по нажатию Esc - complete и edit = false, поэтому ставится класс '' и форма редактирования пропадает
  const classNames = [complete ? 'completed' : '', edit ? 'editing' : ''].join(' ');

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" id={`${id}__check`} onChange={onComplete} checked={complete} />
        <label htmlFor={`${id}__check`}>
          <span className="title">{title}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>

          <span className="description">
            {formatDistanceToNow(createTime, { addSuffix: true, includeSeconds: true, locale: enUS })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onEditTaskInput} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {edit && (
        <form onSubmit={onSubmitHandler}>
          <input type="text" className="edit" value={taskLabel} onChange={onTaskEdit} onBlur={onBlurClick} autoFocus />
        </form>
      )}
    </li>
  );
}

Task.defaultProps = {
  complete: false,
  edit: false,
  id: 100,
  title: '',
  createTime: new Date(),
  min: 0,
  sec: 0,
  onComplete: () => {},
  onEditTaskInput: () => {},
  onDeleted: () => {},
};

Task.propTypes = {
  complete: PropTypes.bool,
  edit: PropTypes.bool,
  id: PropTypes.number,
  title: PropTypes.string,
  createTime: PropTypes.instanceOf(Date),
  onComplete: PropTypes.func,
  onEditTaskInput: PropTypes.func,
  onDeleted: PropTypes.func,
  min: PropTypes.number,
  sec: PropTypes.number,
};
