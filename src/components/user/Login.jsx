import { forwardRef, useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Snackbar, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const defaultForm = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("User login successful.");

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/UserDashboard");
    }
  }, []);

  const loginUser = async () => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_URL}`+`/login`, {
          email: form.email.toLowerCase(),
          password: form.password,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
          }
        });
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        setForm({ ...defaultForm });
        setSnackbarSeverity("success");
        setSnackbarMessage("User login successful.");
        setOpenSnackbar(true);
        setIsPending(false);
        navigate("/UserDashboard");
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage(error.response.data.message);
      setOpenSnackbar(true);
      setIsPending(false);
    }
  };

  const handleSubmit = (e) => {
    setIsPending(true);
    loginUser();
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


  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h2" align="center" gutterBottom>
                Login
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
            <Grid item>
              <Button
                id="forgotPasswordLink"
                name="forgotPasswordLink"
                variant="text"
                href=""
                onClick={() => navigate("/ForgotPassword")}
                fullWidth>
                Forgot Password?
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Snackbar id="snackbar" name="snackbar" open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
          <Alert id="alert" name="alert" onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid >
    </Grid >

  );
};

export default Login;