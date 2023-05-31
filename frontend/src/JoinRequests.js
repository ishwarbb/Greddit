import { Avatar, Card, CardContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubGredditInfobyID, getUserInfo, joinSubgreddit, rejectUser } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";
// import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from "@mui/material/colors";
import Auth from "./Auth";

const MSGInstanceJoinRequests = () => {
  let {id}  = useParams();
  const [usrData, setUsrData] = useState(null);
  const [people, setPeople] = useState([]);
  const [bannedpeople, setBannedPeople] = useState([]);
  const [requestingpeople, setRequestingPeople] = useState(["a"]);
  const [subgreddits, setSubgreddits] = useState([]);

  useEffect(() => {
    let promiseB = async () => {
        const a = await getUserInfo();
        console.log(a);
        setUsrData(a);
        const b = await getSubGredditInfobyID({id : id});
        console.log(b);
        console.log(b.people);
        setSubgreddits(b);
        if(b.people !== undefined) setPeople(b.people);
        if(b.bannedpeople !== undefined) setBannedPeople(b.banned);
        if(b.requestingpeople !== undefined) setRequestingPeople(b.requestingpeople);
      };

    promiseB();
},[]);

    if(!usrData) return <Auth/>
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
                <Card sx={{ maxWidth: 900, width:900 }} elevation={5} style={{backgroundColor: "#f3e5f5"}}> <CardContent>
                        <Typography sx={{ mt: 4, mb: 2 }} color="secondary" variant="h6" component="div">
                            Join - Requests
                        </Typography>
                            <List elevation={5}>
                            {requestingpeople.map( requestinguser => (
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    {/* <DeleteIcon /> */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={requestinguser}
                                    // secondary={peopleInfo[a] ? peopleInfo[a].userName : "Hisname"}
                                />
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete" onClick={()=>
                                    {
                                        console.log("joining - ", id);
                                        console.log("requesting - ", requestinguser);
                                        var res = joinSubgreddit({
                                            newuser : requestinguser,
                                            sgid : id
                                        });
                                        window.location.reload(true); 
                                    }}
                                    >
                                    <DoneIcon sx={{ color: green[500] }} />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <IconButton edge="end" aria-label="delete" onClick={()=>
                                    {
                                        rejectUser({
                                            user : requestinguser,
                                            sgid : id
                                        });
                                        window.location.reload(true); 
                                    }} >
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