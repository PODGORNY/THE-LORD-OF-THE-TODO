import React from 'react';
// валидатор типа данных...чтобы в строку например я точно знал что приходит строка...штука опциональная
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

export default function TaskList({
  items,
  onComplete,
  onDeleted,
  onEditTaskInput,
  onEditTaskOutput,
  startTimer,
  pauseTimer,
}) {
  const taskElems = items.map((item) => (
    <Task
      {...item}
      key={item.id}
      minutes={item.minutes}
      seconds={item.seconds}
      //передаю в функцию помечания выполненной задачи ее id
      onComplete={() => onComplete(item.id)}
      //передаю в функцию удаления задачи ее id
      onDeleted={() => onDeleted(item.id)}
      //передаю в функцию изменения задачи ее id
      onEditTaskInput={() => onEditTaskInput(item.id)}
      onEditTaskOutput={(taskLabel, id) => onEditTaskOutput(taskLabel, id)}
      //передаю в задачу функцию таймера, чтобы там(в Таске) ей воспользоваться
      startTimer={() => startTimer(item.id)}
      pauseTimer={() => pauseTimer(item.id)}
    />
  ));

  return <ul className="todo-list">{taskElems}</ul>;
}

// defaultProps - просто props по умолчанию, если не было указано других значений
TaskList.defaultProps = {
  items: [],
  onComplete: () => {},
  onDeleted: () => {},
  onEditTaskInput: () => {},
  onEditTaskOutput: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
};

// проверка на соответствие типам данных
TaskList.propTypes = {
  items: PropTypes.array,
  onComplete: PropTypes.func,
  onDeleted: PropTypes.func,
  onEditTaskInput: PropTypes.func,
  onEditTaskOutput: PropTypes.func,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};
