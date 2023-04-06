import { useState, useEffect, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";

const Login = () => {

  const navigate = useNavigate();
  const defaultForm = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);


  const [error, setError] = useState({
    email: false,
    password: false,
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
        .post(`${process.env.REACT_APP_BASE_URL}` + `/login`, {
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
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setForm({ ...defaultForm });
        setSnackbarSeverity("success");
        setSnackbarMessage(`Welcome, ${JSON.parse(localStorage.getItem('user')).firstName || "user"}`);
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
                helperText={error.password ? "Password must at least contain: 8 characters, 1 special character, 1 uppercase character." : ""}
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
              <Button
                id="registerLink"
                name="registerLink"
                variant="text"
                href=""
                onClick={() => navigate("/Register")}
                fullWidth>
                New user? Register
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid >
    </Grid >

  );
};

export default Login;