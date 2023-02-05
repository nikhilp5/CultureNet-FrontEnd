import { forwardRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Card, Checkbox, FormControlLabel, Snackbar, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';


const data = require("../data/db.json");


const UserProfile = () => {
  const defaultForm = {
    email: data.users[0].email,
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

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
    console.log(form);


    setIsPending(true);

    if (!Object.values(data).includes(form.email)) {
      let data = { email: form.email, password: form.password };
      setIsPending(false);
      setForm({ ...defaultForm });
      setOpen(true);
    }
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
                  id="fname"
                  name="fname"
                  label="First Name"
                  error={error.fname}
                  onChange={validate}
                  helperText={error.fname ? "Invalid first name format." : ""}
                  value={form.fname}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lname"
                  name="lname"
                  label="Last Name"
                  error={error.lname}
                  onChange={validate}
                  helperText={error.lname ? "Invalid last name format." : ""}
                  value={form.lname}
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
              <FormControlLabel control={<Checkbox checked={form.nsfwFilter} />} label="Adult Content" />
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                onClick={handleSubmit}
                loading={isPending}
                disabled={Object.keys(error).some(k => error[k]) || !form.email}
                variant="contained"
                fullWidth
              >
                Submit
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button variant="text" href="#contained-buttons" fullWidth>
                Change Password?
              </Button>
            </Grid>
          </Grid>
        </Card>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Update successful.
          </Alert>
        </Snackbar>
      </Grid>
    </Grid >

  );
};

export default UserProfile;