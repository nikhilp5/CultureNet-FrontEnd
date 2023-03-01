import * as React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="secondary"
      >
        Welcome. This is the Admin Dashboard Page!
      </Typography>

      <Button variant="outlined" size="large" onClick={() => navigate("/UserDashboard")}>
        Click here to switch to User Dashboard
      </Button>

      <Typography
        component="h1"
        variant="caption"
        align="left"
        color="primary"
      >
        Note: The corresponding dashboard will load based on the role.
      </Typography>
    </div>
  );
}