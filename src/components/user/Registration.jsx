import { forwardRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { Card, Snackbar, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router";


const data = require("../../data/db.json");


const Registration = () => {
  const navigate = useNavigate();
  const defaultForm = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("User login successful.");

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const handleSubmit = (e) => {
    let finalForm = form;
    finalForm.email = form.email.toLowerCase();


    setIsPending(true);

    if (!data.users.find(user => user.email === finalForm.email)) {
      // let data = { email: finalForm.email, password: finalForm.password };
      setForm({ ...defaultForm });
      setSnackbarSeverity("success");
      setSnackbarMessage("User registration successful.");
    }
    else {
      setSnackbarSeverity("error");
      setSnackbarMessage("User already exists!");
    }
    setOpen(true);
    setIsPending(false);
    navigate("/Login");

  };

  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "email":
        errorNew["email"] = !event.target.value.match(emailRegex);
        break;
      case "password":
        errorNew["password"] = !event.target.value.match(passwordRegex);
        if (form.confirmPassword !== '') {
          errorNew["confirmPassword"] = event.target.value !== formNew.confirmPassword;
        }
        break;
      case "confirmPassword":
        errorNew["confirmPassword"] = event.target.value !== formNew.password;
        break;
    }
    setError({ ...errorNew });

  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h2" align="center" gutterBottom>
                Register
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                error={error.email}
                onChange={validate}
                helperText={error.email ? "Invalid email format." : ""}
                value={form.email}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                error={error.password}
                onChange={validate}
                helperText={error.password ? "Invalid password." : ""}
                value={form.password}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                error={error.confirmPassword}
                onChange={validate}
                helperText={error.confirmPassword ? "Passwords do not match." : ""}
                value={form.confirmPassword}
                fullWidth
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                onClick={handleSubmit}
                loading={isPending}
                disabled={Object.keys(error).some(k => error[k]) || Object.keys(form).some(k => !form[k])}
                variant="contained"
                fullWidth
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid >

  );
};

export default Registration;