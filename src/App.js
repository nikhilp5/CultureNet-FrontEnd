import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';
import { AppRoutes } from './routes/Routes';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline enableColorScheme />
          <AppRoutes />
      </ThemeProvider>
    );
  }
}

export default App;