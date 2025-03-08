// src/components/RevisionsComponent.jsx

import React from 'react';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';
import NumberField from './main-fields/NumberField';

const RevisionsComponent = ({ label, conditionKey }) => {
  const { dispatch } = useDateContext();

  const handleRevisionsChange = (newValue) => {
    const value = isNaN(newValue) || newValue <= 0 ? 0 : newValue;
    dispatch({
      type: ACTIONS.SET_NUMERIC_CONDITION,
      payload: { key: conditionKey, value }
    });
  };

  return (
    <div className="number-fields-container">
      <NumberField label={label} initialValue={0} min={0} onChange={handleRevisionsChange} />
    </div>
  );
};

export default RevisionsComponent;
