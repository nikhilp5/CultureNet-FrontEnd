import * as Mui from '@mui/material';
import { appTheme } from '../../themes/theme';
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate(user.role === "admin" ? "/AdminDashboard" : "/UserDashboard");
    }
  }, []);

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