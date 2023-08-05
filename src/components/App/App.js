// версия TODO classes на хуках
import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {
  // значение items: []
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  // фильтрация по нажатию кнопок
  const changeFilter = (item) => {
    setFilter(item);
    return;
  };

  // невыполненые задачи
  const todosItems = (task) => {
    if (task.complete === undefined) {
      const withComlitedFormat = { ...task, completed: false };
      setItems([...items, withComlitedFormat]);
      return;
    }
  };

  // выполненые задачи
  const setComletedTodos = (isComl, id) => {
    const completeTodo = items.map((task) => {
      if (task.id === id) {
        task.completed = isComl;
        return task;
      } else return task;
    });
    setItems(completeTodo);
  };

  const setRemoveTodos = (id) => {
    setItems(items.filter((task) => task.id !== id));
  };

  // удаление выполненых задач
  const onClearActive = () => {
    const activeTasks = items.filter((el) => !el.completed);
    setItems(activeTasks);
  };

  // рендер и передача данных вниз по дереву
  return (
    <section className="todoapp">
      <header className="header">
        <h1>TODOsTIME</h1>
        <NewTaskForm saveTodo={(items) => todosItems(items)} />
      </header>
      <section className="main">
        <TaskList remove={setRemoveTodos} filter={filter} setComletedTodos={setComletedTodos} tasks={items} />
      </section>
      <Footer changeFilter={changeFilter} tasks={items} onClearActive={onClearActive} />
    </section>
  );
};

export default App;
