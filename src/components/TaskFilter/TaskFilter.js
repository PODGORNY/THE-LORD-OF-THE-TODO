import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

const TaskFilter = ({ changeFilter }) => {
  const useFilters = () => {
    const [filters, setFilters] = useState([
      { label: 'All', param: 'all', active: true },
      { label: 'Active', param: 'active', active: false },
      { label: 'Completed', param: 'completed', active: false },
    ]);

    const selectFilter = (filterID) => {
      const newFilters = filters.map((filter) => ({
        ...filter,
        active: filter.param === filterID,
      }));

      setFilters(newFilters);
      changeFilter(filterID);
    };

    return [filters, selectFilter];
  };
  const [filters, changeFilters] = useFilters();

  const onFilter = (param) => {
    changeFilters(param);
  };

  const filtersElems = filters.map((filter) => {
    const className = filter.active ? 'selected' : '';

    return (
      <li key={filter.param}>
        <button type="button" className={className} onClick={() => onFilter(filter.param)}>
          {filter.label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{filtersElems}</ul>;
};

TaskFilter.propTypes = {
  changeFilter: PropTypes.func,
};

export default TaskFilter;
