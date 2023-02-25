import { forwardRef, useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Card, Snackbar, Typography, Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const data = require("../data/db.json");


const ForgotPassword = () => {
  const defaultForm = {
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);

  const [emailTextboxVisible, setEmailTextboxVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [error, setError] = useState({
    email: false,
    code: false,
    password: false,
    confirmPassword: false
  });

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const codeRegex = /^[0-9]{6}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "email":
        errorNew["email"] = !event.target.value.match(emailRegex);
        break;
      case "code":
        errorNew["code"] = !event.target.value.match(codeRegex);
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

    setOpenSnackbar(false);
  };

  const handleClick = (event) => {
    let finalForm = form;
    switch (event.target.name) {
      case "sendCode":
        if (!data.users.find(user => user.email === finalForm.email)) {
          setSnackbarSeverity("error");
          setSnackbarMessage("Invalid user details. (Try 'abc@xyz.com' for demo)");
          setOpenSnackbar(true);
        }
        else {
          setEmailTextboxVisible(false);
        }
        break;
      case "btnOpenDialog":
        break;
      case "cancel":
        setError({ ...error, password: false });
        setError({ ...error, confirmPassword: false });
        setOpenDialog(false);
        break;
      case "updatePassword":
        if (data.users.find(user => user.email === finalForm.email)) {
          setIsPending(false);
          setOpenDialog(false);
          setSnackbarSeverity("success");
          setSnackbarMessage('Password changed successfully.');
          setOpenSnackbar(true);
        }
        else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Invalid user details.");
          setOpenSnackbar(true);
          setOpenDialog(false);
        }
        setEmailTextboxVisible(true);
        setForm({ ...defaultForm });
        break;
    }
  };

  const handleOpen = (event) => {
    switch (event.target.name) {
      case "btnOpenDialog":
        setOpenDialog(true);
        break;
    }
  };


  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h2" align="center" gutterBottom>
                Forgot Password
              </Typography>
            </Grid>
            <Grid item>
              {emailTextboxVisible ?
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
                /> : <TextField
                  id="code"
                  name="code"
                  label="Code"
                  type="number"
                  error={error.code}
                  onChange={validate}
                  helperText={error.code ? "Invalid code format." : ""}
                  value={form.code}
                  fullWidth
                />}

            </Grid>

            <Grid item>
              {emailTextboxVisible ?

                <LoadingButton
                  type="submit"
                  id="sendCode"
                  name="sendCode"
                  onClick={handleClick}
                  loading={isPending}
                  disabled={error.email || !form.email || !emailTextboxVisible}
                  variant="contained"
                  fullWidth
                >
                  Send Code
                </LoadingButton> : <LoadingButton
                  type="submit"
                  id="btnOpenDialog"
                  name="btnOpenDialog"
                  // onClick={handleClick}
                  onClick={handleOpen}

                  loading={isPending}
                  disabled={error.code || !form.code || emailTextboxVisible}
                  variant="contained"
                  fullWidth
                >
                  Reset Password
                </LoadingButton>}
            </Grid>
          </Grid>
        </Card>
        <Snackbar id="snackbar" name="snackbar" open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
          <Alert id="alert" name="alert" onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={openDialog}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
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
                  label="Re-enter Password"
                  type="password"
                  error={error.confirmPassword}
                  onChange={validate}
                  helperText={error.confirmPassword ? "Passwords do not match." : ""}
                  value={form.confirmPassword}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button id="cancel" name="cancel" onClick={handleClick}>Cancel</Button>
            <Button id="updatePassword" name="updatePassword" variant="contained" onClick={handleClick} disabled={Object.keys(error).some(k => error[k]) || Object.keys(form).some(k => !form[k])}>Reset</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid >

  );
};

export default ForgotPassword;