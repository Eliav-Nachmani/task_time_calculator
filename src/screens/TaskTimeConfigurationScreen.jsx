// src/screens/TaskTimeConfigurationScreen.jsx

import React from 'react';
import { Box } from '@mui/material';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';
import TaskTypeComponent from '../components/TaskTypeComponent';
import BinaryOptionComponent from '../components/BinaryOptionComponent';
import AnimationComponent from '../components/AnimationComponent';
import RevisionsComponent from '../components/RevisionsComponent';
import ManagedDateField from '../components/ManagedDateField';

const TaskTimeConfigurationScreen = ({ tabValue }) => {
  const { state, dispatch } = useDateContext();
  const { startDate, completionDate, activeTaskType } = state;

  const handleTaskTypeChange = (type) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_TASK_TYPE, payload: type });
  };

  return (
    <Box>
      {tabValue === 0 ? (
        <div className="field-left-align">
          <ManagedDateField label="Start Date" initialDate={startDate} dateType="start" />
          <TaskTypeComponent title="Select Task Type" onTaskTypeChange={handleTaskTypeChange} />
          <BinaryOptionComponent title="Will SLX be assisting with copy?" conditionKey="copyAssistance" />
          <BinaryOptionComponent title="Will there be new dynamic content involved?" conditionKey="dynamicContent" />
          <AnimationComponent title="Would you like to add animation? (timelines will be extended)"/>
          <RevisionsComponent label="DESIGN Expected Number of Revisions Rounds" conditionKey="designRevisions" />
          <RevisionsComponent label="PRODUCTION Expected Number of Revisions Rounds" conditionKey="productionRevisions" />
          {activeTaskType === 'email' && (
            <>
              <BinaryOptionComponent title="Will there be a need for email editable task?" conditionKey="emailEditable" />
              <BinaryOptionComponent title="Will SLX be scheduling/sending the email?" conditionKey="emailScheduleSend" />
            </>
          )}
          {activeTaskType === 'landingPage' && (
            <BinaryOptionComponent title="Will there be a need for LP editable task?" conditionKey="lpEditableReview" />
          )}
        </div>
      ) : (
        <div className="field-left-align">
          <ManagedDateField label="Completion Date" initialDate={completionDate} dateType="completion" />
          <TaskTypeComponent title="Select task type" onTaskTypeChange={handleTaskTypeChange} />
          <BinaryOptionComponent title="Will SLX be assisting with copy?" conditionKey="copyAssistance" />
          <BinaryOptionComponent title="Will there be new dynamic content involved?" conditionKey="dynamicContent" />
          <AnimationComponent title="Would you like to add animation? (timelines will be extended)"/>
          <RevisionsComponent label="DESIGN Expected Number of Revisions Rounds" conditionKey="designRevisions" />
          <RevisionsComponent label="PRODUCTION Expected Number of Revisions Rounds" conditionKey="productionRevisions" />
          {activeTaskType === 'email' && (
            <>
              <BinaryOptionComponent title="Will there be a need for email editable task?" conditionKey="emailEditable" />
              <BinaryOptionComponent title="Will SLX be scheduling/sending the email?" conditionKey="emailScheduleSend" />
            </>
          )}
          {activeTaskType === 'landingPage' && (
            <BinaryOptionComponent title="Will there be a need for LP editable task?" conditionKey="lpEditableReview" />
          )}
        </div>
      )}
    </Box>
  );
};

export default TaskTimeConfigurationScreen;
