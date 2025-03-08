// src/components/main-fields/NumberField.jsx

import React, { useState } from 'react';
import { TextField } from '@mui/material';

const NumberField = ({ label, initialValue = 0, min = 0, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const newValue = event.target.valueAsNumber;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      fullWidth
      InputProps={{ inputProps: { min: min } }}
    />
  );
};

export default NumberField;
