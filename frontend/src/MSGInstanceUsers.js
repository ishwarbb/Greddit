import { Avatar, Card, CardContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "./Auth";
import { getOtherUserInfo, getSubGredditInfobyID, getUserInfo } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";

const MSGInstanceUsers = () => {
  let {id}  = useParams();
  const [usrData, setUsrData] = useState(null);
  const [people, setPeople] = useState([]);
  const [peopleInfo, setPeopleInfo] = useState({});
  const [bannedpeople, setBannedPeople] = useState([]);
  const [subgreddits, setSubgreddits] = useState([]);


  useEffect(() => {
    let promiseB = async () => {
        const a = await getUserInfo();
        console.log(a);
        setUsrData(a);
        const b = await getSubGredditInfobyID({id : id});
        console.log(b);
        console.log(b.people);
        console.log(b.blockedpeople);
        setSubgreddits(b);
        if(b.people !== undefined) 
        {
            setPeople(b.people);
            var pinfo = {};
            console.log("people = ",b.people);
            for(let i =0 ; i < b.people.length; i++)
            {
                const otheruser = await getOtherUserInfo({targetemail:b.people[i]});
                pinfo[b.people[i]] = otheruser;
            }
    
            setPeopleInfo(pinfo);
            console.log("pinfo = ",pinfo)
            // console.log("pinfo[a] = ",pinfo['ishwarbb25@gmail.com'].userName)
        }
        if(b.bannedpeople !== undefined)
        {
          console.log("HI")
          setBannedPeople(b.blockedpeople);
        }


    }

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
                <Card sx={{ maxWidth: 900, width:900 }} elevation={5} style={{backgroundColor: "#f3e5f5"}}> <CardContent>
                       <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} color="secondary" variant="h6" component="div">
                            Users of this SubGreddit:
                        </Typography>
                            <List >
                            {people.map( a => (
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    {/* <FolderIcon /> */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={a}
                                    secondary={peopleInfo[a] ? peopleInfo[a].userName : "Hisname"}
                                />
                                </ListItem>
                            ))}
                            </List>
                        </Grid>
                        </CardContent> </Card>
                        <br></br>
                        <Grid item xs={12} md={6}>
                        <Card sx={{ maxWidth: 900, width:900 }} elevation={5} style={{backgroundColor: "#f3e5f5"}}> <CardContent>
                        <Typography sx={{ mt: 4, mb: 2 }} color="secondary" variant="h6" component="div">
                            Blocked users of this SubGreddit:
                        </Typography>
                            <List >
                            {bannedpeople.map( a => (
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    {/* <FolderIcon /> */}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={a}
                                    secondary={peopleInfo[a] ? peopleInfo[a].userName : "Hisname"}
                                />
                                </ListItem>
                            ))}
                            </List>
                            </CardContent></Card>
                        </Grid>
            </Grid> 
        </div>
     );
}
 
export default MSGInstanceUsers;