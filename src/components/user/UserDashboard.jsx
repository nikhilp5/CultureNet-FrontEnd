import * as React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from "react-router";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="secondary"
      >
        Welcome. This is the User Dashboard Page!
      </Typography>

      <Button variant="outlined" size="large" onClick={() => navigate("/AdminDashboard")}>
        Click here to switch to Admin Dashboard
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