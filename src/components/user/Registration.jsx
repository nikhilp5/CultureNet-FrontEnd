import { useState, useEffect, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";

const Registration = () => {

  const navigate = useNavigate();
  const defaultForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  const nameRegex = /^\b([A-Za-zÀ-ÿ][-,a-z. ']+[ ]*)+$/g;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/UserDashboard");
    }
  }, []);

  const registerUser = async () => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_URL}` + `/register`, {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email.toLowerCase(),
          password: form.password,
          confirmPassword: form.confirmPassword
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
          }
        });
      if (response.status == 201) {
        setForm({ ...defaultForm });
        setSnackbarSeverity("success");
        setSnackbarMessage("User registration successful.");
        setOpenSnackbar(true);
        setIsPending(false);
        navigate("/Login");
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
    registerUser();
  };

  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "firstName":
        errorNew["firstName"] = !event.target.value.trim().match(nameRegex);
        break;
      case "lastName":
        errorNew["lastName"] = !event.target.value.trim().match(nameRegex);
        break;
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
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  error={error.firstName}
                  onChange={validate}
                  helperText={error.firstName ? "Invalid first name format." : ""}
                  value={form.firstName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  error={error.lastName}
                  onChange={validate}
                  helperText={error.lastName ? "Invalid last name format." : ""}
                  value={form.lastName}
                  fullWidth
                />
              </Grid>
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
                helperText={error.password ? "Password must at least contain: 8 characters, 1 special character, 1 uppercase alphabet, 1 lowercase alphabet." : ""}
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
            <Grid item>
              <Button
                id="loginLink"
                name="loginLink"
                variant="text"
                href=""
                onClick={() => navigate("/Login")}
                fullWidth>
                Already a user? login
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid >

  );
};

export default Registration;