import React, { useEffect, useRef, useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timerTime, setTimerTime] = useState(false);
  const [filters, setFilters] = useState([
    { label: 'All', param: 'all', active: true },
    { label: 'Active', param: 'active', active: false },
    { label: 'Completed', param: 'completed', active: false },
  ]);
  const ref = useRef();

  // срабатывает когда меняется значение в массиве
  //тут нечему меняться - поэтому срабатывает 1 раз...аналогично ComponentDidMount
  useEffect(() => {
    ref.current = 1;
  }, []);

  // создание задачи...запись вводных данных функцию создания объекта-----------------------------добавление
  const onAddTask = (label, min, sec) => {
    const newTask = createTask(label, min, sec);
    setItems((items) => {
      return [...items, newTask];
    });
  };

  // создание задачи...добавление объекта с нужными свойствами
  const createTask = (label, min, sec) => ({
    title: label,
    createTime: new Date(),
    complete: false,
    edit: false,
    id: Math.floor(Math.random() * 100),
    minutes: min,
    seconds: sec,
    timerId: null,
    isTimerOn: false,
  });

  // пересборка массива с обновленными объектами
  // берутся объекты До изменённого и после...и собираются в новый массив без измененного
  const toggleTaskRebuild = (arr, id, prop) => {
    const indxElem = arr.findIndex((elem) => elem.id === id);
    const element = arr[indxElem];

    const newElement = {
      ...element,
      [prop]: !element[prop],
    };

    return [...arr.slice(0, indxElem), newElement, ...arr.slice(indxElem + 1, arr.length)];
  };

  // переключатель статуса complete...тру / фолс...выполнено
  const completeTaskHandler = (id) => {
    setItems((items) => {
      return toggleTaskRebuild(items, id, 'complete');
    });
  };

  // редактирование задачи...переключатель статуса редактирования edit------------------------------------------редактирование
  // запрос на редактирование приходит...начальные данные из задачи пойдут в форму для редактирования
  const onEditTaskInput = (id) => {
    setItems((items) => {
      const editItems = items.map((item) => ({
        ...item,
        edit: item.id === id,
      }));

      return editItems;
    });
  };

  // редактирование задачи..выводные данные...сборка массива с уже изменёнными свойствами
  // запись отредактированных данных обратно в задачу
  const onEditTaskOutput = (value, id) => {
    setItems((items) => {
      const editItems = items.map((item) => {
        if (item.id !== id) {
          return item;
        } else {
          return { ...item, edit: false, title: value };
        }
      });

      return editItems;
    });
  };

  // удаление задачи...убирает объект с 'нажатым' id----------------------------------удаление
  const deleteTaskHandler = (id) => {
    setItems((items) => {
      const idx = items.findIndex((item) => item.id === id);
      return [...items.slice(0, idx), ...items.slice(idx + 1)];
    });
  };

  // удаление выполненых задач разом
  const onClearСompleted = () => {
    setItems((items) => {
      return items.filter((item) => !item.complete);
    });
  };

  // фильтр состояния задачи--------------------------------------------------------------условия работы фильтра
  const onFilterTask = () => {
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
  const filterHandler = (param) => {
    setFilters((filters) => {
      const forFilters = filters.map((filter) => ({
        ...filter,
        active: filter.param === param,
      }));
      setActiveFilter(param);
      return forFilters;
    });
  };

  // таймер...кнопки старт / пауза------------------------------------------------------------------------таймер
  const startTimer = (id) => {
    if (!timerTime) {
      setTimerTime(true);
      ref.current = setInterval(() => {
        setItems((items) => {
          const idx = items.findIndex((elem) => elem.id === id);
          if (idx === -1) {
            clearInterval(ref.current);
            setTimerTime(false);
            return [...items];
          }
          const element = items[idx];
          let newElement = { ...element, seconds: element.seconds - 1 };
          if (newElement.seconds < 0) {
            newElement = { ...newElement, minutes: element.minutes - 1, seconds: 59 };
          }
          if (newElement.seconds === 0 && newElement.minutes === 0) {
            clearInterval(ref.current);
            setTimerTime(false);
          }
          return [...items.slice(0, idx), newElement, ...items.slice(idx + 1)];
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    setTimerTime(false);
  };

  // беру свойства из банка событий
  //const { items, filters } = this.state;
  // фильтр задач...
  const filterTask = onFilterTask();
  // активные задачи
  const activeTaskNumber = items.filter((item) => !item.complete).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>TODOsHOOK</h1>
        <NewTaskForm onAddTask={onAddTask} />
      </header>
      <section className="main">
        <TaskList
          items={filterTask}
          onComplete={completeTaskHandler}
          onDeleted={deleteTaskHandler}
          onEditTaskInput={onEditTaskInput}
          onEditTaskOutput={onEditTaskOutput}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
      </section>
      <Footer
        activeTaskNumber={activeTaskNumber}
        onFilter={filterHandler}
        // значения кнопок фильтра
        filters={filters}
        onClearСompleted={onClearСompleted}
      />
    </section>
  );
}
