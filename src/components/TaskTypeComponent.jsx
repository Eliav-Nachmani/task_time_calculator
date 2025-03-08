// src/components/TaskTypeComponent.jsx

import React from 'react';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';
import RadioButtonField from './main-fields/RadioButtonField';

const TaskTypeComponent = ({ title }) => { // Accept title as a prop
  const { dispatch } = useDateContext();
  const options = [
    { value: 'email', label: 'Email' },
    { value: 'landingPage', label: 'Landing Page' }
  ];

  const handleTaskTypeChange = (newType) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TASK_TYPE, payload: newType });
  };

  return (
    <div className="field-left-align">
      <p>{title}</p>
      <RadioButtonField
        options={options}
        initialValue="email"
        onChange={handleTaskTypeChange}
      />
    </div>
  );
};

export default TaskTypeComponent;
