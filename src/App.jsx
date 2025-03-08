// src/App.jsx

import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateProvider } from './utils/reducer';
import MainScreen from './screens/MainScreen';
import './App.css'; // Import the CSS file

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateProvider>
          <MainScreen />
        </DateProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
