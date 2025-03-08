// src/screens/MainScreen.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import TabsLayout from '../main-components/TabsLayout';

const MainScreen = () => {
  return (
    <div>
      {/* <Typography variant="h4" className="app-title">
        SLX Task Time Calculator
      </Typography> */}
      <Box className="app-container">
        <TabsLayout />
      </Box>
    </div>
  );
};

export default MainScreen;
