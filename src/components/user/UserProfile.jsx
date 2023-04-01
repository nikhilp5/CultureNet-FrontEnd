import { forwardRef, useEffect, useState, useContext } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Switch, FormControlLabel, Snackbar, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { UserContext } from '../../utils/UserContext';
import { useNavigate } from "react-router";


const data = require("../../data/db.json");


const UserProfile = () => {
  const { auth, setAuth } = useContext(UserContext);

  const navigate = useNavigate();
  const defaultForm = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    nsfw: false,
  };

  const defaultDialogForm = {
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState({ ...defaultForm, ...defaultDialogForm });

  const [isPending, setIsPending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    email: false,
    nsfw: false,
    password: false,
    confirmPassword: false
  });

  const fetchProfile = async () => {
    const response = await axios
      .post("http://localhost:4000/.netlify/functions/api/profile", {
        email: localStorage.getItem("email")
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
        }
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      if (response.status == 200) {
        setForm(response.data.user);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage('Something went wrong! Please refresh to try again...');
      setOpenSnackbar(true);
    }
  };

  const changePassword = async () => {
    const response = await axios
      .put("http://localhost:4000/.netlify/functions/api/changepassword", {
        email: localStorage.getItem("email"),
        password: form.password,
        confirmPassword: form.confirmPassword
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
        }
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      if (response.status == 200) {
        setForm(response.data.user);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage('Something went wrong! Please refresh to try again...');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/Login");
    }
    fetchProfile();
  }, []);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
  const nameRegex = /\b([A-Za-zÀ-ÿ][-,a-z. ']+[ ]*)+/g;


  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "firstName":
        errorNew["firstName"] = !event.target.value.match(nameRegex);
        break;
      case "lastName":
        errorNew["lastName"] = !event.target.value.match(nameRegex);
        break;
      case "email":
        errorNew["email"] = !event.target.value.match(emailRegex);
        break;
      case "nsfw":
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


  const handleSubmit = (e) => {
    setIsPending(true);
    if (!Object.values(data).includes(form.email)) {
      setIsPending(false);
      setSnackbarMessage('Profile updated successfully.');
      setOpenSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarMessage('');
    setOpenSnackbar(false);
  };

  const handleOpen = (event) => {
    switch (event.target.name) {
      case "changePasswordLink":
        setOpenDialog(true);
        break;
    }
  };

  const handleClick = (event) => {
    switch (event.target.name) {
      case "nsfw":
        setForm({ ...form, nsfw: !form.nsfw });
        break;
      case "cancel":
        setForm({ ...form, ...defaultDialogForm });
        setError({ ...error, password: false });
        setError({ ...error, confirmPassword: false });
        setOpenDialog(false);
        break;
      case "updatePassword":
        if (!Object.values(data).includes(form.email)) {
          setIsPending(false);
          changePassword();
          setSnackbarSeverity("success");
          setForm({ ...form, ...defaultDialogForm });
          setOpenDialog(false);
          setSnackbarMessage('Password changed successfully.');
          setOpenSnackbar(true);
        }

        console.log(form);
        break;
    }
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      {/* <form onSubmit={handleSubmit}> */}
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h2" align="center" gutterBottom>
                User Profile
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
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
                label="Email"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                value={form.email}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                error={error.bio}
                onChange={validate}
                helperText={error.bio ? "Invalid bio format." : ""}
                value={form.bio}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                label="Show Adult Content"
                control={<Switch
                  id="nsfw"
                  name="nsfw"
                  checked={form.nsfw}
                  onClick={handleClick}
                />}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                onClick={handleSubmit}
                loading={isPending}
                disabled={Object.keys(error).some(k => error[k]) || !form.email || openDialog}
                variant="contained"
                fullWidth
              >
                Submit
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button
                id="changePasswordLink"
                name="changePasswordLink"
                variant="text"
                href="#contained-buttons"
                onClick={handleOpen}
                fullWidth>
                Change Password?
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Snackbar id="snackbar" name="snackbar" open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
          <Alert id="alert" name="alert" onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Dialog open={openDialog}>
          <DialogTitle>Change Password</DialogTitle>
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
            <Button id="updatePassword" name="updatePassword" variant="contained" onClick={handleClick}>Update</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid >

  );
};

export default UserProfile;