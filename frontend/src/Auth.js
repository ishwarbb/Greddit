import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Auth = () => {
    function mylink(link, name) {
        return <Link href={link} underline="hover"> {name} </Link>
    };

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
            You are NOT logged in
        </Typography>
        <Typography>
            {/* Please {mylink("/login", "login")}if you wish to use this website. */}
    
            Please <Link href={"/login"} underline="hover" onClick={()=>window.location.replace('/login')}> login </Link> if you wish to use this website.
        </Typography>
    </Grid>
     );
}
 
export default Auth;