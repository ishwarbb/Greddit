import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
// import { useRef } from 'react';



const SignIn = () => {
    const inputRef = React.useRef(null);
    const [msg,setMsg] = useState(null);

    const fieldErrorValues = {
      "email" : false,
      "password" : false
    }

    const [fieldErrors, setFieldErrors] = useState(fieldErrorValues);

    const ErrorMsg = () => {
      return (
        <Typography color="red">
          {msg}
        </Typography>
      )
    };

    const handleIncorrect = () => {
      inputRef.current.value = '';
      setMsg("Invalid email/password. Or maybe not regeistered?");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const fieldErrorValues = {
          "email" : false,
          "password" : false
        }

        setFieldErrors(fieldErrorValues);
        let noAccept = 0;

        if(data.get('email') === "")
        {
          fieldErrorValues['email'] = true;
          setFieldErrors(fieldErrorValues);
          noAccept = 1;
        }

        if(data.get('password') === "")
        {
          fieldErrorValues['password'] = true;
          setFieldErrors(fieldErrorValues);
          noAccept = 1;
        }

        if(noAccept) 
        {
          setMsg("Please enter valid entries");
          return;
        }

        // let user = localStorage.getItem(data.get('email'));
        // user = JSON.parse(user)

        let user = data.get('email') ;

        console.log("user = ",user)
        if(user === null)
        {
          handleIncorrect();
        }
        else
        {
          const userdetails = {
            email: data.get('email'),
            password: data.get('password'),
          };
          // if(data.get('password') !== user["password"])
          
          console.log("Calling userAuth");
          var x = userAuth(userdetails);

        }
      };

      async function userAuth(user) {
        
        console.log("posting /auth", user);

        try{
        const response = await axios.post(
          "/auth",user
        );

        console.log("returning ",response);

        console.log("x is ",response.status);
        if(response.status !== 200) 
        {
          handleIncorrect();
        }else 
        {
          localStorage.setItem('token', response.data.token);

          window.location.replace('/');
        }
        
        return response;

      }
        catch
        {
          handleIncorrect();
        };
      }

    return (  
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="User Name"
          name="email"
          autoComplete="email"
          autoFocus
          ref={inputRef}
          error={fieldErrors['email']}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={fieldErrors['password']}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ErrorMsg />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>

    );
}
 
export default SignIn;


