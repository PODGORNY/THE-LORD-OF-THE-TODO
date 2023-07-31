import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // получение функции из пропса...аналог function NewTaskForm({onAddTask})
    // без пробелов не сработает...трим поможет)
    if (this.state.label.trim()) {
      this.props.onAddTask(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          value={this.state.label}
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          autoFocus
        />
      </form>
    );
  }
}
