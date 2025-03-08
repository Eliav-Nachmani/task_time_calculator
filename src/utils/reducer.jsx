// src/utils/reducer.jsx

import React, { createContext, useContext, useReducer } from 'react';
import moment from 'moment';
import { ACTIONS } from './constants';
import { taskConfigurations } from './taskConfigurations';
import { addBusinessDays, subtractBusinessDays } from './dateUtils';

const DateContext = createContext();

const initialState = {
  startDate: moment().format('YYYY-MM-DD'),
  completionDate: '',
  conditions: {
    emailEditable: false,
    emailScheduleSend: false,
    lpEditableReview: false,
  },
  activeTaskType: 'email',
  primaryDate: 'start',
};

const calculateCompletionDate = (startDate, conditions, activeTaskType) => {
  let currentDate = moment(startDate);
  const stages = taskConfigurations[activeTaskType].stages;
  const year = currentDate.year();

  stages.forEach(stage => {
    let duration = stage.duration || 0;
    if (stage.conditionKey) {
      if (conditions[stage.conditionKey]) {
        if (stage.conditionKey.includes("Revisions")) {
          duration += (conditions[stage.conditionKey] - 1) * 2; // Add 2 days for each additional revision round
        } else {
          duration = stage.duration; // Ensure duration is pulled from taskConfigurations
        }
      } else {
        duration = 0; // Skip this stage if the condition is not met
      }
    }
    currentDate = addBusinessDays(currentDate, duration, year);
  });

  return currentDate.format('YYYY-MM-DD');
};

const calculateStartDate = (completionDate, conditions, activeTaskType) => {
  let currentDate = moment(completionDate).add(1, 'days');
  const stages = taskConfigurations[activeTaskType].stages.slice().reverse();
  const year = currentDate.year();

  stages.forEach(stage => {
    let duration = stage.duration || 0;
    if (stage.conditionKey) {
      if (conditions[stage.conditionKey]) {
        if (stage.conditionKey.includes("Revisions")) {
          duration += (conditions[stage.conditionKey] - 1) * 2; // Add 2 days for each additional revision round
        } else {
          duration = stage.duration; // Ensure duration is pulled from taskConfigurations
        }
      } else {
        duration = 0; // Skip this stage if the condition is not met
      }
    }
    currentDate = subtractBusinessDays(currentDate, duration, year);
  });

  return currentDate.format('YYYY-MM-DD');
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_START_DATE:
      if (state.primaryDate === 'start') {
        const newCompletionDate = calculateCompletionDate(action.payload, state.conditions, state.activeTaskType);
        return {
          ...state,
          startDate: action.payload,
          completionDate: newCompletionDate,
        };
      }
      return {
        ...state,
        startDate: action.payload,
      };

    case ACTIONS.SET_COMPLETION_DATE:
      if (state.primaryDate === 'completion') {
        const newStartDate = calculateStartDate(action.payload, state.conditions, state.activeTaskType);
        return {
          ...state,
          startDate: newStartDate,
          completionDate: action.payload,
        };
      }
      return {
        ...state,
        completionDate: action.payload,
      };

    case ACTIONS.SET_PRIMARY_DATE:
      return {
        ...state,
        primaryDate: action.payload,
      };

    case ACTIONS.SET_CONDITIONS:
      const updatedConditions = { ...state.conditions, ...action.payload };
      let newStartDate = state.startDate;
      let newCompletionDate = state.completionDate;

      if (state.primaryDate === 'start') {
        newCompletionDate = calculateCompletionDate(state.startDate, updatedConditions, state.activeTaskType);
      } else {
        newStartDate = calculateStartDate(state.completionDate, updatedConditions, state.activeTaskType);
      }

      return {
        ...state,
        conditions: updatedConditions,
        startDate: newStartDate,
        completionDate: newCompletionDate,
      };

    case ACTIONS.SET_ACTIVE_TASK_TYPE:
      return {
        ...state,
        activeTaskType: action.payload,
      };

    case ACTIONS.SET_NUMERIC_CONDITION:
    case ACTIONS.TOGGLE_CONDITION:
      const newConditions = {
        ...state.conditions,
        [action.payload.key]: action.payload.value,
      };
      let startDate = state.startDate;
      let completionDate = state.completionDate;

      if (state.primaryDate === 'start') {
        completionDate = calculateCompletionDate(state.startDate, newConditions, state.activeTaskType);
      } else {
        startDate = calculateStartDate(state.completionDate, newConditions, state.activeTaskType);
      }

      return {
        ...state,
        conditions: newConditions,
        startDate: startDate,
        completionDate: completionDate,
      };

    default:
      return state;
  }
}

export const DateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DateContext.Provider value={{ state, dispatch }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);

export default DateContext;
