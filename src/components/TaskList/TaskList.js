import React, { Component } from 'react';
// валидатор типа данных...чтобы в строку например я точно знал что приходит строка...штука опциональная
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default class TaskList extends Component {
  // defaultProps - просто props по умолчанию, если не было указано других значений
  static defaultProps = {
    items: [],
    onComplete: () => {},
    onDeleted: () => {},
    onEditTaskInput: () => {},
    onEditTaskOutput: () => {},
  };

  // проверка на соответствие типам данных
  static propTypes = {
    items: PropTypes.array,
    onComplete: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditTaskInput: PropTypes.func,
    onEditTaskOutput: PropTypes.func,
  };

  render() {
    const { items, onComplete, onDeleted, onEditTaskInput, onEditTaskOutput } = this.props;
    const taskElems = items.map((item) => (
      <Task
        {...item}
        key={item.id}
        //передаю в функцию помечания выполненной задачи ее id
        onComplete={() => onComplete(item.id)}
        //передаю в функцию удаления задачи ее id
        onDeleted={() => onDeleted(item.id)}
        //передаю в функцию изменения задачи ее id
        onEditTaskInput={() => onEditTaskInput(item.id)}
        onEditTaskOutput={(taskLabel, id) => onEditTaskOutput(taskLabel, id)}
      />
    ));

    return <ul className="todo-list">{taskElems}</ul>;
  }
}
