import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import AppRoutes from './routes/Routes';
import React, { Component } from 'react';
import './App.css';
import Navbar from './components/common/Navbar';
import { ContextProvider } from './utils/UserContext';

class App extends Component {
  render() {
    return (
      <ContextProvider>
        <ThemeProvider theme={appTheme}>
          <CssBaseline enableColorScheme />
          <Navbar />
          <AppRoutes />
        </ThemeProvider>
      </ContextProvider>
    );
  }
}

export default App;
