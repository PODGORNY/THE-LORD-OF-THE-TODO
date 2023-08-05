import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const changeFilter = (item) => {
    setFilter(item);
    return;
  };

  const todosItems = (task) => {
    if (task.complete === undefined) {
      const withComlitedFormat = { ...task, completed: false };
      setTodos([...todos, withComlitedFormat]);
      return;
    }
  };

  const setComletedTodos = (isComl, id) => {
    const completeTodo = todos.map((task) => {
      if (task.id === id) {
        task.completed = isComl;
        return task;
      } else return task;
    });
    setTodos(completeTodo);
  };

  const setRemoveTodos = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const onClearActive = () => {
    const activeTasks = todos.filter((el) => !el.completed);
    setTodos(activeTasks);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm saveTodo={(items) => todosItems(items)} />
      </header>
      <section className="main">
        <TaskList remove={setRemoveTodos} filter={filter} setComletedTodos={setComletedTodos} tasks={todos} />
      </section>
      <Footer changeFilter={changeFilter} tasks={todos} onClearActive={onClearActive} />
    </section>
  );
};

export default App;
