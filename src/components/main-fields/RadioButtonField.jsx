// src/components/main-fields/RadioButtonField.jsx

import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

const RadioButtonField = ({ options, initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <RadioGroup row value={value} onChange={handleChange}>
      {options.map((option) => (
        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
      ))}
    </RadioGroup>
  );
};

export default RadioButtonField;
