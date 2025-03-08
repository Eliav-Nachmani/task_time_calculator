// src/components/BinaryOptionComponent.jsx

import React from 'react';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';
import RadioButtonField from './main-fields/RadioButtonField';

const BinaryOptionComponent = ({ title, conditionKey }) => {
  const { dispatch } = useDateContext();

  const handleOptionChange = (newValue) => {
    dispatch({
      type: ACTIONS.TOGGLE_CONDITION,
      payload: { key: conditionKey, value: newValue === 'yes' }
    });
  };

  return (
    <div className="field-left-align">
      <p>{title}</p>
      <RadioButtonField
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
        initialValue='no'
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default BinaryOptionComponent;
