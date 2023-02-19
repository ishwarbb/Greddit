import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllGredditInfo, getUserGredditInfo, getUserInfo } from "./misc";


const SubGredditsPage= () => {
    const [open, setOpen] = useState(false);
    const [usrData, setUsrData] = useState(null);
    const [subgreddits, setSubgreddits] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            const b = await getAllGredditInfo();
            console.log(a);
            console.log(b);
            setUsrData(a);
            setSubgreddits(b);
          };
    
        promiseB();
    },[]);


    return ( 
        <>
        <Box  marginTop='150px' marginLeft='100px' marginBottom='50px' alignItems="center" justifyContent="center" >
        </Box>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            // justifyContent="center"
            style={{ minHeight: '100vh' }}
        >

        { subgreddits.map((subgreddit) => 
            (
                <>
            <Card sx={{ maxWidth: 900, width:900 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                // title="Shrimp and Chorizo Paella"
                title= {subgreddit.name}
                subheader= {subgreddit.tags.join('-')}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    People : {subgreddit.people.length}  Posts : {subgreddit.posts.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Banned KeyWords: {subgreddit.bannedKeywords.join(", ")} 
                </Typography>
                <Typography gutterBottom maxWidth={900} paragraph>
                    {subgreddit.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="secondary" onClick={()=> window.location.replace("/subgreddits/"+subgreddit._id) }>
                    Open <OpenInBrowserIcon/>
                </Button>
                <Button color="secondary">
                    Delete <DeleteIcon/>
                </Button>
            </CardActions>
            </Card>
            <br></br>
            </>
            ))
        }


        </Grid> 
        </>
     );
}
 
export default SubGredditsPage;