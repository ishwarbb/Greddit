import { Avatar, Card, CardContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubGredditInfobyID } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from "@mui/material/colors";

const MSGInstanceJoinRequests = () => {
  let {id}  = useParams();
  const [people, setPeople] = useState([]);
  const [bannedpeople, setBannedPeople] = useState([]);
  const [requestingpeople, setRequestingPeople] = useState(["a"]);
  const [subgreddits, setSubgreddits] = useState([]);

  useEffect(() => {
    let promiseB = async () => {
        const b = await getSubGredditInfobyID({id : id});
        console.log(b);
        console.log(b.people);
        setSubgreddits(b);
        if(b.people !== undefined) setPeople(b.people);
        if(b.bannedpeople !== undefined) setBannedPeople(b.banned);
        if(b.requestingpeople !== undefined) setBannedPeople(b.requestingpeople);
      };

    promiseB();
},[]);

    return ( 
        <div>
            <MSGInstanceBar/>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ minHeight: '100vh' , marginTop:'100px'}}
            >
                       <Grid item xs={12} md={6}>
                <Card sx={{ maxWidth: 900, width:900 }}> <CardContent>
                        <Typography sx={{ mt: 4, mb: 2 }} color="secondary" variant="h6" component="div">
                            Join - Requests
                        </Typography>
                            <List elevation={5}>
                            {people.map( a => (
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    {/* <DeleteIcon /> */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={a}
                                    // secondary={peopleInfo[a] ? peopleInfo[a].userName : "Hisname"}
                                />
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete">
                                    <DoneIcon sx={{ color: green[500] }} />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete">
                                    <CloseIcon sx={{ color: red[500] }}/>
                                    </IconButton>
                                </ListItemIcon>
                                </ListItem>
                            ))}
                            </List>
                            </CardContent></Card>
                        </Grid>
            </Grid> 
        </div>
     );
}
 
export default MSGInstanceJoinRequests;