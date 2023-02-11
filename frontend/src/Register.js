import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
var bcrypt = require('bcryptjs');

async function saveData(reqdata)
{
    const response = await axios.post(
    "/pushdata",
    reqdata
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
    console.log("error");
    }
}


const Register = () => {
  const [state, setState] = useState({
    open: false,
  });
  const { open } = state;
  const [msg, setMsg] = useState(null);

  const handleClose = () => {
    setState({ open: false });
    window.location.replace('/login');
  };

  const fieldErrorValues = {
    "email": false,
    "password": false,
    "username": false,
    "firstname": false,
    "lastname": false,
    "age": false,
    "contactnumber": false
  }

  const [fieldErrors, setFieldErrors] = useState(fieldErrorValues);

  const ErrorMsg = () => {
    return (
      <Typography color="red">
        {msg}
      </Typography>
    )
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // console.log(data);

    const fieldErrorValues = {
      "email": false,
      "password": false
    }

    setFieldErrors(fieldErrorValues);
    let noAccept = 0;

    if (data.get('email') === "") {
      fieldErrorValues['email'] = true;
      setFieldErrors(fieldErrorValues);
      noAccept = 1;
    }

    if (data.get('password') === "") {
      fieldErrorValues['password'] = true;
      setFieldErrors(fieldErrorValues);
      noAccept = 1;
    }

    if (noAccept) {
      setMsg("Please enter valid entries");
      return;
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.get('password'), salt);

    let userdata = {
      email: data.get('email'),
      password: hash,
      username: data.get('username'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      age: data.get('age'),
      contactnumber: data.get('contactnumber')
    };
    localStorage.setItem(userdata.email, JSON.stringify(userdata));
    console.log("Calling saveData");
    saveData(userdata);
    setState({ open: true, });

  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            error={fieldErrors['firstname']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            error={fieldErrors['lastname']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="userName"
            label="User Name"
            name="username"
            autoComplete="User Name"
            error={fieldErrors['username']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={fieldErrors['email']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={fieldErrors['password']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="age"
            name="age"
            required
            fullWidth
            id="age"
            label="Age"
            autoFocus
            error={fieldErrors['age']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="contactNumber"
            label="Contact Number"
            name="contactnumber"
            autoComplete="contact-number"
            error={fieldErrors['contactnumber']}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <ErrorMsg />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="#" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message="Thank you for registering. Please login to continue."
        ContentProps={{
          sx: {
            background: "green"
          }
        }}
      />
    </Box>
  );
}

export default Register;


