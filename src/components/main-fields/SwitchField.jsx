// src/components/main-fields/SwitchField.jsx

import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const SwitchField = ({ label, initialChecked, onChange }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked); // Invoke callback with the new checked state
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label={label}
    />
  );
};

export default SwitchField;
