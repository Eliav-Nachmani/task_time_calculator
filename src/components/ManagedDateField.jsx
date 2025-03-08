// src/components/ManagedDateField.jsx

import React, { useState, useEffect } from 'react';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';
import DateField from './main-fields/DateField';

const ManagedDateField = ({ initialDate, label, dateType }) => {
  const [date, setDate] = useState(initialDate);
  const { dispatch } = useDateContext();

  useEffect(() => {
    setDate(initialDate); // Ensure it reacts to external changes
  }, [initialDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    dispatch({ type: ACTIONS.SET_PRIMARY_DATE, payload: dateType });
    if (dateType === 'start') {
      dispatch({ type: ACTIONS.SET_START_DATE, payload: newDate });
    } else if (dateType === 'completion') {
      dispatch({ type: ACTIONS.SET_COMPLETION_DATE, payload: newDate });
    }
  };

  return (
    <div className="date-field">
      <DateField 
        label={label} 
        value={date} 
        onChange={handleDateChange}
      />
    </div>
  );
};

export default ManagedDateField;
