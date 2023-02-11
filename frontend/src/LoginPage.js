import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BasicTabs from './BasicTabs';
import { Link } from '@mui/material';

const theme = createTheme();

const LoginPage = () => {
  localStorage.setItem('admin',JSON.stringify({
    "email": 'admin@admin',
    "password": 'admin',
    "username": 'admin',
    "firstname": 'admin',
    "lastname": 'admin',
    "age": 20,
    "contactnumber": 8660156238
  }));

  let loggedinUser = localStorage.getItem('logged in');
  console.log(loggedinUser)

  function mylink(link,name)
  {
      return <Link href={link} underline="hover"> {name} </Link>
  };

  if( loggedinUser !== null && loggedinUser !=="null")
  {
      return ( 
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
          >
              <Typography variant="h4">
                  You are Already logged in
              </Typography>
              <Typography>
                Not {mylink("/",loggedinUser)} ?  Please {mylink("/logout","logout")} to regiter/login from another account
              </Typography>
          </Grid> 
      );
  }

  return (    
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              marginTop : 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <BasicTabs>
            </BasicTabs>
        </Box>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;