import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

export default function App() {
  const [uniqId, setUniqId] = useState(0);
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timerTime, setTimerTime] = useState(false);
  const [filters, setFilters] = useState([
    { label: 'All', param: 'all', active: true },
    { label: 'Active', param: 'active', active: false },
    { label: 'Completed', param: 'completed', active: false },
  ]);

  // создание задачи...запись вводных данных функцию создания объекта-----------------------------добавление
  const onAddTask = (label, min, sec) => {
    const newTask = createTask(label, min, sec);
    setItems((items) => {
      return [...items, newTask];
    });
  };

  // создание задачи...добавление объекта с нужными свойствами
  const createTask = (label, min, sec) => {
    setUniqId(uniqId + 1);
    return {
      title: label,
      createTime: new Date(),
      complete: false,
      edit: false,
      id: uniqId,
      minutes: min,
      seconds: sec,
      timerId: null,
      isTimerOn: false,
    };
  };

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
  const pauseTimer = (id) => {
    const { isTimerOn } = items.find((item) => item.id === id);
    if (isTimerOn) {
      const { timerId } = items.find((item) => item.id === id);
      setItems((prevData) => {
        const idx = prevData.findIndex((item) => item.id === id);
        const data = [...prevData];
        data[idx].isTimerOn = false;

        return data;
      });
      clearInterval(timerId);
    }
  };

  const startTimer = (id) => {
    const { isTimerOn } = items.find((item) => item.id === id);

    if (!isTimerOn) {
      const timerId = setInterval(() => {
        setItems((prevData) => {
          const updateTodo = prevData.map((todoItem) => {
            if (todoItem.id === id) {
              if (todoItem.seconds === 0 && todoItem.minutes === 0) {
                pauseTimer(id);
              }
              let sec = todoItem.seconds - 1;
              let min = todoItem.minutes;
              if (min > 0 && sec < 0) {
                min -= 1;
                sec = 59;
              }
              if (min === 0 && sec < 0) {
                sec = 0;
                pauseTimer(id);
              }

              return {
                ...todoItem,
                seconds: sec,
                minutes: min,
              };
            }

            return todoItem;
          });

          return updateTodo;
        });
      }, 1000);
      setItems((prevData) => {
        const idx = prevData.findIndex((item) => item.id === id);
        const data = [...prevData];
        data[idx].timerId = timerId;
        data[idx].isTimerOn = true;

        return data;
      });
    }
  };

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
