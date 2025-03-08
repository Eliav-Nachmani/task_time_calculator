// src/main-components/TabsLayout.jsx

import React, { useState } from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';
import TaskTimeConfigurationScreen from '../screens/TaskTimeConfigurationScreen';
import TaskTimelineScreen from '../screens/TaskTimelineScreen';
import { useDateContext } from '../utils/reducer';
import { ACTIONS } from '../utils/constants';

function TabsLayout() {
  const [value, setValue] = useState(0);
  const { dispatch } = useDateContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch({ type: ACTIONS.SET_PRIMARY_DATE, payload: newValue === 0 ? 'start' : 'completion' });
  };

  return (
    <Box>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="task time calculator tabs"
        className="tabs-container"
        variant="fullWidth"
      >
        <Tab label="Start Date" className="full-width-tab" />
        <Tab label="Completion Date" className="full-width-tab" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TaskTimeConfigurationScreen tabValue={value} /> 
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskTimelineScreen tabValue={value} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TabsLayout;
