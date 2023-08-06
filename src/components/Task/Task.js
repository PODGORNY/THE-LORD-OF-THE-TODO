import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  static defaultProps = {
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

  static propTypes = {
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

  state = {
    taskLabel: this.props.title,
  };

  // описание задачи
  onTaskEdit = (e) => {
    this.setState({
      taskLabel: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    // получение данных в классе...через пропс...аналог входа в функцию
    const { onEditTaskOutput, id } = this.props;
    const { taskLabel } = this.state;
    // изменение задачи...запись отредактированных данных
    if (taskLabel.trim()) {
      onEditTaskOutput(taskLabel.trim(), id);
    }
  };

  getEditField = () => {
    // узнаю статус редактирования
    const { edit } = this.props;
    if (edit) {
      return (
        // форма перед отправкой записывает отредактированные данные
        <form onSubmit={this.onSubmitHandler}>
          <input type="text" className="edit" value={this.state.taskLabel} onChange={this.onTaskEdit} />
        </form>
      );
    }
  };

  render() {
    const {
      complete,
      edit,
      id,
      title,
      createTime,
      onComplete,
      onEditTaskInput,
      onDeleted,
      startTimer,
      pauseTimer,
      minutes,
      seconds,
    } = this.props;

    // выбор класса в разметку
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

        {edit && this.getEditField()}
      </li>
    );
  }
}
