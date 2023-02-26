import * as React from 'react';
import * as Mui from '@mui/material';
import Navbar from './Navbar';
import { appTheme } from '../../themes/theme';

export default function LandingPage() {
  return (
    <Mui.ThemeProvider theme={appTheme}>
      <Mui.CssBaseline />
      <Navbar />

      <Mui.Typography
        component="h1"
        variant="h5"
        align="left"
        color="secondary"
      >
        Welcome. This is the Landing Page.
      </Mui.Typography>

      <Mui.Link href="/UserDashboard">
        <Mui.Typography
          component="h1"
          variant="h6"
          align="left"
          color="primary"
        >
          Click Here to go to The User Dashboard (To Test Linking and Routing)
        </Mui.Typography>
      </Mui.Link>

      <Mui.Link href="/UserDashboard">
        <Mui.Typography
          component="h1"
          variant="h6"
          align="left"
          color="primary"
        >
          Click Here to go to The Admin Dashboard (To Test Linking and Routing)
        </Mui.Typography>
      </Mui.Link>

    </Mui.ThemeProvider>
  );
}