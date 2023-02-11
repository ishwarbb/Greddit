import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "@mui/material";

const LogOut = () => {
    let loggedinUser = localStorage.getItem('logged in');
    console.log(loggedinUser)

    function mylink(link,name)
    {
        return <Link href={link} underline="hover"> {name} </Link>
    };

    if((loggedinUser === null) || (loggedinUser === 'null'))
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
                    You are logged out
                </Typography>
                <Typography>
                    Please {mylink("/login","login")}if you want to view your profile.
                </Typography>
            </Grid> 
        );
    }


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
                Are you sure?
            </Typography>
            <Box paddingTop={5} >
                <Button variant="contained" onClick={()=>{localStorage.setItem('logged in',null);window.location.replace("/login")}}>Yes</Button>
                <Button variant="text" onClick={()=>window.location.replace("/")}  >Cancel</Button>
            </Box>
        </Grid> 
    );
}
 
export default LogOut;

