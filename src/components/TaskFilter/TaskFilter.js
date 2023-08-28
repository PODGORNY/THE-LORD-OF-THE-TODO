import React from 'react';
import './TaskFilter.css';

export default function TaskFilter({ onFilter, filters }) {
  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter.param}>
          <button type="button" className={filter.active ? 'selected' : ''} onClick={() => onFilter(filter.param)}>
            {filter.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
