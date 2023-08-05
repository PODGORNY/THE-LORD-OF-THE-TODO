import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = (props) => {
  // функции для кнопок фильтра из App
  const { changeFilter, tasks, onClearActive } = props;

  // счётчик
  const [todoCount, setTodoCount] = useState(0);

  useEffect(() => {
    const count = tasks.filter((el) => !el.completed).length;

    setTodoCount(count);
  }, [tasks]);

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>

      <TaskFilter changeFilter={changeFilter} />

      <button className="clear-completed" onClick={onClearActive}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  changeFilter: () => {},
  tasks: [],
  onClearActive: () => {},
};

Footer.propTypes = {
  changeFilter: PropTypes.func,
  tasks: PropTypes.array,
  onClearActive: PropTypes.func,
};

export default Footer;
