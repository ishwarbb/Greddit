import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { getSubGredditInfobyID, getUserInfo } from './misc';
import Auth from './Auth';

const pages = ['Users', 'Join-Requests', 'Stats','Reported'];


function MSGInstanceBar() {
  
  let {id}  = useParams();
const [usrData, setUsrData] = React.useState(null);

  const path = {
    'Users' : '/mysubgreddits/' + id + "/users", 
    'Join-Requests' : '/mysubgreddits/' + id + "/joinrequests", 
    'Stats' : '/mysubgreddits/' + id + "/stats",
    'Reported' : '/mysubgreddits/' + id + "/reported"
  }

  const [subgreddits, setSubgreddits] = React.useState([]);


  React.useEffect(() => {
    let promiseB = async () => {
      const a = await getUserInfo();
      console.log(a);
      setUsrData(a);
        const b = await getSubGredditInfobyID({id : id});
        console.log(b);
        setSubgreddits(b);
      };

    promiseB();
},[]);

  if(!usrData) return <Auth/> 
  return (
    <AppBar position="static" sx={{marginTop : '95px',backgroundColor: "#773183"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={()=> window.location.replace('/mysubgreddits')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Subgreddit : {subgreddits.name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{
                  console.log("hi")  ; 
                  window.location.replace(path[page])}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MSGInstanceBar;