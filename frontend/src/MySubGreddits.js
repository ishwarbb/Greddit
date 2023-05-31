import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { deleteSubGreddit, getUserGredditInfo, getUserInfo } from "./misc";
import Auth from "./Auth";

async function createSubgreddits(data)
{
    const response = await axios.post(
        "/createsubgreddit",
        data
        );
        if (response.status === 200) {
            console.log("Success");
        } else {
        console.log("error");
        }
}

const MyGreddits = () => {
    // const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [usrData, setUsrData] = useState(null);
    const [subgreddits, setSubgreddits] = useState([]);

    const fieldErrorValues = {
        "name": false,
      }
      const [fieldErrors, setFieldErrors] = useState(fieldErrorValues);
      const [msg, setMsg] = useState(null);
      const ErrorMsg = () => {
        return (
          <Typography color="red">
            {msg}
          </Typography>
        )
      };

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            const b = await getUserGredditInfo();
            console.log(a);
            console.log(b);
            setUsrData(a);
            setSubgreddits(b);
          };
    
        promiseB();
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log("submitted ",data)

        let noAccept = 0;

        if (data.get('name') === "") {
          fieldErrorValues['name'] = true;
          setFieldErrors(fieldErrorValues);
          noAccept = 1;
        }
    
        if (noAccept) {
          setMsg("Please enter valid entries");
          return;
        }

        let subgredditdata = {
            creator: usrData.email,
            name: data.get('name'),
            description: data.get('description'),
            tags: data.get('tags').split(',').map(item => item.trim()),
            bannedKeywords: data.get('bannedKeywords').split(',').map(item => item.trim()),
            people : [usrData.email]
        };

        createSubgreddits(subgredditdata);

        console.log(subgredditdata);

        handleClose();
        window.location.reload(true);
    };

    if(!usrData) return <Auth/>
    return ( 
        <>
        <Box  marginTop='150px' marginLeft='100px' marginBottom='50px' alignItems="center" justifyContent="center" >
            <Button variant="contained" color="secondary" onClick={handleClickOpen} >Create SubGreddit</Button>
        </Box>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            // justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Dialog open={open} onClose={handleClose} component="form" noValidate onSubmit={handleSubmit} > 
                <DialogTitle>Create SubGreddit</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To create a new greddit, please enter the details here. You will be the moderator for this subgreddit. 
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={10}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="tags"
                    name = "tags"
                    label="Tags"
                    fullWidth
                    variant="standard"
                    placeholder="[comma sepereted] [all lowercase]"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="bannedKeywords"
                    name="bannedKeywords"
                    label="Banned Keywords"
                    fullWidth
                    variant="standard"
                    placeholder=" (If any) [comma sepereted] [all lowercase]"
                />
                </DialogContent>
                <DialogActions>
                <ErrorMsg />
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" >Create</Button>
                </DialogActions>
            </Dialog>

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
                    Banned KeyWords: {subgreddit.bannedKeywords.join(", ")} .
                </Typography>
                <Typography gutterBottom maxWidth={900} paragraph>
                    {subgreddit.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="secondary" onClick={()=> window.location.replace("/mysubgreddits/"+subgreddit._id + "/users") }>
                    Open <OpenInBrowserIcon/>
                </Button>
                <Button color="secondary" onClick={()=> {
                    deleteSubGreddit({sgid : subgreddit._id});
                    window.location.reload(true);            
                    }} >
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
 
export default MyGreddits;