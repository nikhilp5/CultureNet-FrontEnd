import { forwardRef, useState } from "react";
import TextField from '@mui/material/TextField';
import { Box, Snackbar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import MuiAlert from '@mui/material/Alert';


const users = require("../data/db.json");


const Registration = () => {
  const defaultForm = {
    email: '',
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const handleSubmit = (e) => {
    console.log(form);

    setIsPending(true);

    if (!Object.values(users).includes(form.email)) {
      setIsPending(false);
      console.log('new user added');
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
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" gutterBottom>
        Register
      </Typography>
      {/* <Stack> */}
      <form onSubmit={handleSubmit}>
        {/* <Item > */}
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          error={error.email}
          onChange={validate}
          helperText={error.email ? "Invalid email format." : ""}
          value={form.email}
        />
        {/* </Item>
          <Item> */}
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
        />
        {/* </Item>
          <Item> */}
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
        />
        {/* </Item>
          <Item> */}
        {/* <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={Object.keys(error).some(k => error[k])}>Submit</Button> */}

        <LoadingButton
          loading={isPending}
          // loadingPosition="start"
          onClick={handleSubmit}
          disabled={Object.keys(error).some(k => error[k]) || Object.keys(form).some(k => !form[k])}
          // startIcon={<SaveIcon />}
          variant="contained"
        >
          Submit
        </LoadingButton>
        {/* </Item> */}
      </form>
      {/* </Stack> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
      {/* <Alert severity="success">This is a success message!</Alert> */}
    </Box >
  );
};

export default Registration;