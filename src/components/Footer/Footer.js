import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter/TaskFilter';

import './Footer.css';

export default class Footer extends Component {
  static defaultProps = {
    activeTaskNumber: 0,
    onFilter: () => {},
    onClearСompleted: () => {},
  };

  static propTypes = {
    activeTaskNumber: PropTypes.number,
    onFilter: PropTypes.func,
    onClearСompleted: PropTypes.func,
  };

  render() {
    const { activeTaskNumber, onFilter, onClearСompleted, filters } = this.props;
    //Строка 27 -передаем значение фильтра и массив кнопок-фильтров в TaskFilter
    return (
      <footer className="footer">
        <span className="todo-count">{activeTaskNumber} items left</span>
        <TaskFilter onFilter={onFilter} filters={filters} />
        <button className="clear-completed" onClick={onClearСompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
