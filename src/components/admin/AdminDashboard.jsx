import * as React from 'react';
import * as Mui from '@mui/material';
import Navbar from '../common/Navbar';
import { appTheme } from '../../themes/theme';

export default function AdminDashboard() {
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
        Welcome. This Is the Admin Dashboard Page!
      </Mui.Typography>

      <Mui.Link href="/">
        <Mui.Typography
          component="h1"
          variant="h6"
          align="left"
          color="primary"
        >
          Click Here to go to back to the Landing Page (To Test Linking and Routing)
        </Mui.Typography>
      </Mui.Link>


    </Mui.ThemeProvider>
  );
}