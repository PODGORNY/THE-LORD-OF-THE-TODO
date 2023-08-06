import React from 'react';

import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';

import './App.css';

export default class App extends React.Component {
  maxId = 100;

  state = {
    items: [],
    activeFilter: 'all',
    timerTime: false,
    // фильтрация по нажатию кнопок
    filters: [
      { label: 'All', param: 'all', active: true },
      { label: 'Active', param: 'active', active: false },
      { label: 'Completed', param: 'completed', active: false },
    ],
  };

  // создание задачи...запись вводных данных функцию создания объекта-----------------------------добавление
  onAddTask = (label, min, sec) => {
    this.setState((state) => ({ items: [this.createTask(label, min, sec), ...state.items] }));
  };

  // создание задачи...добавление объекта с нужными свойствами
  createTask = (label, min, sec) => ({
    title: label,
    createTime: new Date(),
    complete: false,
    edit: false,
    id: this.maxId++,
    minutes: min,
    seconds: sec,
  });

  // пересборка массива с обновленными объектами
  // берутся объекты До изменённого и после...и собираются в новый массив без измененного
  toggleTaskRebuild = (arr, id, prop) => {
    const indxElem = arr.findIndex((elem) => elem.id === id);
    const element = arr[indxElem];

    const newElement = {
      ...element,
      [prop]: !element[prop],
    };

    return [...arr.slice(0, indxElem), newElement, ...arr.slice(indxElem + 1, arr.length)];
  };

  // переключатель статуса complete...тру / фолс...выполнено
  completeTaskHandler = (id) => {
    this.setState((state) => ({
      items: this.toggleTaskRebuild(state.items, id, 'complete'),
    }));
  };

  // редактирование задачи...переключатель статуса редактирования edit------------------------------------------редактирование
  // запрос на редактирование приходит...начальные данные из задачи пойдут в форму для редактирования
  onEditTaskInput = (id) => {
    this.setState((state) => {
      const items = state.items.map((item) => ({
        ...item,
        // меняем значение editing на true у задачи, которая меняется ( у которой task.id === id)
        edit: item.id === id,
      }));

      return { items };
    });
  };

  // редактирование задачи..выводные данные...сборка массива с уже изменёнными свойствами
  // запись отредактированных данных обратно в задачу
  onEditTaskOutput = (value, id) => {
    this.setState((state) => {
      const items = state.items.map((item) => {
        if (item.id !== id) {
          return item;
        } else {
          return { ...item, edit: false, title: value };
        }
      });

      return { items };
    });
  };

  // удаление задачи...убирает объект с 'нажатым' id----------------------------------удаление
  deleteTaskHandler = (id) => {
    this.setState(() => ({
      items: this.state.items.filter((item) => item.id !== id),
    }));
  };

  // удаление выполненых задач разом
  onClearСompleted = () => {
    this.setState((state) => ({
      items: state.items.filter((item) => !item.complete),
    }));
  };

  // фильтр состояния задачи--------------------------------------------------------------условия работы фильтра
  onFilterTask = () => {
    const { activeFilter, items } = this.state;

    // все
    if (activeFilter === 'all') {
      return items;
    }
    // выполненные
    if (activeFilter === 'completed') {
      return items.filter((item) => item.complete);
    }
    // активные
    if (activeFilter === 'active') {
      return items.filter((item) => !item.complete);
    }
  };

  // связка фильтра и кнопок, чтоб его вызвать
  filterHandler = (param) => {
    this.setState((state) => {
      const filters = state.filters.map((filter) => ({
        ...filter,
        active: filter.param === param,
      }));

      return {
        filters,
        activeFilter: param,
      };
    });
  };

  // таймер...кнопки старт / пауза------------------------------------------------------------------------таймер
  startTimer = (id) => {
    if (!this.state.timerTime) {
      this.timer = setInterval(() => {
        this.setState(({ items }) => {
          const idx = items.findIndex((elem) => elem.id === id);
          const element = items[idx];
          let newElement = { ...element, seconds: element.seconds - 1 };
          if (newElement.seconds < 0) {
            newElement = { ...newElement, minutes: element.minutes - 1, seconds: 59 };
          }
          if (newElement.seconds === 0 && newElement.minutes === 0) {
            clearInterval(this.timer);
            this.setState({ timerTime: false });
          }
          const newArr = [...items.slice(0, idx), newElement, ...items.slice(idx + 1)];
          return {
            items: newArr,
            timerTime: true,
          };
        });
      }, 1000);
    }
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerTime: false });
  };

  render() {
    // беру свойства из банка событий
    const { items, filters } = this.state;
    // фильтр задач...
    const filterTask = this.onFilterTask();
    // активные задачи
    const activeTaskNumber = items.filter((item) => !item.complete).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>TODOsTIME</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList
            items={filterTask}
            onComplete={this.completeTaskHandler}
            onDeleted={this.deleteTaskHandler}
            onEditTaskInput={this.onEditTaskInput}
            onEditTaskOutput={this.onEditTaskOutput}
            startTimer={this.startTimer}
            pauseTimer={this.pauseTimer}
          />
        </section>
        <Footer
          activeTaskNumber={activeTaskNumber}
          onFilter={this.filterHandler}
          // значения кнопок фильтра
          filters={filters}
          onClearСompleted={this.onClearСompleted}
        />
      </section>
    );
  }
}
