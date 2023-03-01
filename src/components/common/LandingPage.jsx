import * as React from 'react';
import * as Mui from '@mui/material';
import { appTheme } from '../../themes/theme';

export default function LandingPage() {
  return (
    <Mui.ThemeProvider theme={appTheme}>
      <Mui.CssBaseline />

      <Mui.Typography
        component="h1"
        variant="h5"
        align="left"
        color="secondary"
      >
        Welcome. This is the Landing Page.
      </Mui.Typography>
    </Mui.ThemeProvider>
  );
}