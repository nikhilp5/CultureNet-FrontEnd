import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import { AppRoutes } from './routes/Routes';
import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;