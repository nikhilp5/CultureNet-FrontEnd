import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';


const Registration = () => {

  const defaultForm = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [form, setForm] = useState(defaultForm);

  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false
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

    fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setIsPending(false);
      console.log('new user added');
      setForm(defaultForm);
    }).catch((err) => {
      setIsPending(false);
      console.error(err);
    });

  };

  const validate = (event) => {
    let formNew = form;
    formNew[event.target.name] = event.target.value;
    setForm({ ...formNew });
    let errorNew = error;
    switch (event.target.name) {
      case "email":
        errorNew[event.target.name] = !event.target.value.match(emailRegex);
        break;
      case "password":
        errorNew[event.target.name] = !event.target.value.match(passwordRegex);
        break;
      case "confirmPassword":
        errorNew[event.target.name] = event.target.value !== formNew.password;
        break;
    }
    setError({ ...errorNew });

  };

  const abc = () => {
    console.log(error);
    console.log(Object.keys(error).some(k => error[k]));
    console.log(form);
    console.log(Object.keys(form).some(k => !form[k]));
    return Object.keys(error).some(k => error[k]) || Object.keys(form).some(k => !form[k]);
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
          disabled={abc()}
          // startIcon={<SaveIcon />}
          variant="contained"
        >
          Submit
        </LoadingButton>
        {/* </Item> */}
      </form>
      {/* </Stack> */}
    </Box >
  );
};

export default Registration;