// src/components/main-fields/DateField.jsx

import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const DateField = ({ label, value, onChange }) => {
  const shouldDisableDate = (date) => {
    const day = date.day();
    return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
  };

  return (
    <DatePicker
      label={label}
      value={value ? moment(value, 'YYYY-MM-DD') : null} // Ensure value is a moment object
      onChange={(newValue) => onChange(newValue ? newValue.format('YYYY-MM-DD') : '')}
      shouldDisableDate={shouldDisableDate}
      slotProps={{
        textField: { fullWidth: true },
      }} 
    />
  );
};

export default DateField;
