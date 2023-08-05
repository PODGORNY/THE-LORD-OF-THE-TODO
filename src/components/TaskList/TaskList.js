import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = (props) => {
  // получение данных из APP
  const { remove, tasks, setComletedTodos, filter } = props;

  // фильтр задач
  const filterTasks = (tasks, filter) => {
    if (filter === 'all') {
      return tasks;
    }
    if (filter === 'completed') {
      return tasks.filter((task) => {
        if (task.completed === true) return task;
      });
    }
    if (filter === 'active') {
      return tasks.filter((task) => {
        if (task.completed === false) return task;
      });
    }
  };

  const filteredTasks = filterTasks(tasks, filter);
  // создаётся список задач с передачей каждой свойств
  const taskElems = filteredTasks.map((task) => {
    const taskCompleted = task.completed;
    return (
      <Task remove={remove} taskCompleted={taskCompleted} setComletedTodos={setComletedTodos} {...task} key={task.id} />
    );
  });

  // рендер списка задач
  return <ul className="todo-list">{taskElems}</ul>;
};

TaskList.propTypes = {
  remove: PropTypes.func,
  tasks: PropTypes.array,
  setComletedTodos: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskList;
