import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import { AppRoutes } from './routes/Routes';
import React, { Component } from 'react';
import { HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export default App;