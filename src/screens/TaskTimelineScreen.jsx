// src/screens/TaskTimelineScreen.jsx

import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useDateContext } from '../utils/reducer';
import { taskConfigurations } from '../utils/taskConfigurations';
import { ACTIONS } from '../utils/constants';
import { calculateEndDate, formatDate } from '../utils/dateUtils';

// Function to convert hex to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = (bigint & 255);
  return { r, g, b };
};

// Function to generate a color palette
const generateColorPalette = (numColors) => {
  const startColor = '#f0f0f0'; // Light grey
  const endColor = '#001c39'; // Dark blue
  const startRGB = hexToRgb(startColor);
  const endRGB = hexToRgb(endColor);

  const colorArray = [];
  for (let i = 0; i < numColors; i++) {
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * (i / (numColors - 1)));
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * (i / (numColors - 1)));
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * (i / (numColors - 1)));
    colorArray.push(`rgb(${r},${g},${b})`);
  }
  return colorArray;
};

// Function to determine the text color based on the background color
const getTextColor = (backgroundColor) => {
  const rgb = backgroundColor.match(/\d+/g);
  const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                                 (parseInt(rgb[1]) * 587) +
                                 (parseInt(rgb[2]) * 114)) / 1000);
  return (brightness > 125) ? '#001c39' : '#ffffff';
};

const TaskTimelineScreen = ({ tabValue }) => {
  const { state, dispatch } = useDateContext();
  const { startDate, conditions, activeTaskType, completionDate, primaryDate } = state;

  const stages = taskConfigurations[activeTaskType].stages;
  const timeline = calculateEndDate(startDate, stages, conditions);

  const uniqueTasks = [...new Set(timeline.map(stage => stage.stageName))];
  const colorPalette = generateColorPalette(uniqueTasks.length);
  const taskColorMap = uniqueTasks.reduce((acc, task, index) => {
    acc[task] = colorPalette[index];
    return acc;
  }, {});

  const newCompletionDate = timeline.length > 0 ? timeline[timeline.length - 1].endDate : '';

  const prevCompletionDateRef = useRef(completionDate);
  useEffect(() => {
    prevCompletionDateRef.current = completionDate;
  });

  useEffect(() => {
    if (primaryDate === 'start' && newCompletionDate !== prevCompletionDateRef.current && newCompletionDate !== completionDate) {
      dispatch({ type: ACTIONS.SET_COMPLETION_DATE, payload: newCompletionDate });
    }
  }, [newCompletionDate, completionDate, dispatch, primaryDate]);

  const approvalDates = timeline.reduce((acc, stage) => {
    if (stage.requiresClientsAttention) {
      const lastStage = timeline.filter(s => s.stageName === stage.stageName).pop();
      if (lastStage && !acc.some(item => item.key === lastStage.stageName)) {
        acc.push(
          <Typography key={lastStage.stageName} className="approval-dates">
            {lastStage.stageName} proof ready for approval by <span className="light-blue-date">{formatDate(lastStage.endDate)}</span>
          </Typography>
        );
      }
    }
    return acc;
  }, []);

  const totalDesignRevisions = conditions.designRevisions || 0;
  const totalProductionRevisions = conditions.productionRevisions || 0;
  const totalRevisions = totalDesignRevisions + totalProductionRevisions;

  return (
    <Box padding={3} className="field-left-align">
      <div className="date-field-container">
        {tabValue === 0 && (
          <Box className="date-box">
            <Typography variant="h6" className="regular-font">Your estimated completion date <br /> for this project is</Typography>
            <Typography variant="h4" className="date-text"><span className="bold-light-blue">{formatDate(completionDate)}</span></Typography>
          </Box>
        )}
        {tabValue === 1 && (
          <Box className="date-box">
            <Typography variant="h6" className="regular-font">Your estimated start date <br /> for this project is</Typography>
            <Typography variant="h4" className="date-text"><span className="bold-light-blue">{formatDate(startDate)}</span></Typography>
          </Box>
        )}
      </div>
      <Box className="steps-container">
        {timeline.map((stage, index) => {
          const bgColor = taskColorMap[stage.stageName];
          const textColor = getTextColor(bgColor);
          return (
            (!stage.conditionKey || conditions[stage.conditionKey]) && stage.duration > 0 && (
              <Box key={index} className="step-box" style={{ backgroundColor: bgColor, color: textColor }}>
                <Typography><span className="step-date">{formatDate(stage.endDate)}</span><br/> {stage.stageName}</Typography>
              </Box>
            )
          );
        })}
      </Box>
      <Box mt={3}>
        {tabValue === 0 ? (
          <Typography variant="h6" className="approval-dates">
            Based on our start date of <span className="light-blue-date">{formatDate(startDate)}</span>, our completion date will be <span className="light-blue-date">{formatDate(completionDate)}</span>. The below outline is when we can expect to have the following updates:
          </Typography>
        ) : (
          <Typography variant="h6" className="approval-dates">
            Based on our completion date of <span className="light-blue-date">{formatDate(completionDate)}</span>, our start date will be <span className="light-blue-date">{formatDate(startDate)}</span>. The below outline is when we can expect to have the following updates:
          </Typography>
        )}
        <br/>
        {approvalDates}
        <br/>
        <Typography variant="h6" className="approval-dates">
          This estimate is based on an estimated <span className="light-blue-date">{totalRevisions}</span> number of rounds of revisions required for your projects. Delayed approvals will result in a later estimated completion date.
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskTimelineScreen;
