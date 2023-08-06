import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  // введёные данные в форму
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  // отправляет данные с формы и...обнуляет форму
  onSubmit = (e) => {
    e.preventDefault();

    // получение функции из пропса...аналог function NewTaskForm({onAddTask})
    // без пробелов не сработает...трим поможет)
    if (this.state.label.trim()) {
      this.props.onAddTask(this.state.label.trim(), this.state.minutes, this.state.seconds);
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  // значения в таймере
  onEditMinute = (event) => {
    this.setState({
      minutes: Number(event.target.value),
    });
  };

  onEditSecond = (event) => {
    this.setState({
      seconds: event.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          value={this.state.label}
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min={0}
          onChange={this.onEditMinute}
          value={this.state.minutes}
          autoFocus
        ></input>
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={this.onEditSecond}
          value={this.state.seconds}
          min={1}
          max={59}
          autoFocus
        ></input>
        <button type="submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAddTask: () => {},
};

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};
