// src/components/AnimationComponent.jsx

import React, { useState, useEffect } from 'react';
import SwitchField from './main-fields/SwitchField';
import RadioButtonField from './main-fields/RadioButtonField';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';

const AnimationComponent = ({ title }) => { // Accept title as a prop
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState('simple'); // Default to "simple"
  const { dispatch } = useDateContext();

  useEffect(() => {
    if (isEnabled) {
      if (selectedAnimation === 'simple') {
        dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'simpleAnimation', value: true } });
        dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'complexAnimation', value: false } });
      } else if (selectedAnimation === 'complex') {
        dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'simpleAnimation', value: false } });
        dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'complexAnimation', value: true } });
      }
    } else {
      setSelectedAnimation('simple');
      dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'simpleAnimation', value: false } });
      dispatch({ type: ACTIONS.TOGGLE_CONDITION, payload: { key: 'complexAnimation', value: false } });
    }
  }, [isEnabled, selectedAnimation, dispatch]);

  const handleSwitchChange = (checked) => {
    setIsEnabled(checked);
  };

  const handleAnimationTypeChange = (newValue) => {
    setSelectedAnimation(newValue);
  };

  const animationOptions = [
    { value: 'simple', label: 'Simple' },
    { value: 'complex', label: 'Complex' }
  ];

  return (
    <div className="field-left-align">
      <p>{title}</p>
      <SwitchField label="Add Animation" initialChecked={false} onChange={handleSwitchChange} />
      {isEnabled && (
        <RadioButtonField
          options={animationOptions}
          initialValue="simple"
          onChange={handleAnimationTypeChange}
        />
      )}
    </div>
  );
};

export default AnimationComponent;
