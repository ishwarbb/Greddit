import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blockUser, getOtherUserInfo, getReportbyId, getSubGredditInfobyID, IgnoreReport } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";
import { Box } from "@mui/system";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useRef } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { addComments, getPosts, getPostsbyPostedIn, getUserInfo } from "./misc";
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FlagIcon from '@mui/icons-material/Flag';
import BlockIcon from '@mui/icons-material/Block';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import CloseIcon from '@mui/icons-material/Close';


const MSGInstanceUsers = () => {
  let {id}  = useParams();
  const [reportedPosts, setReportedPosts] = useState([]);
  const [reportsInfo, setReportsInfo] = useState({});
  const [subgreddits, setSubgreddits] = useState([]);
  const [cancelBlock, setCancelBlock] = useState(0);


  useEffect(() => {
    let promiseB = async () => {
        const b = await getSubGredditInfobyID({id : id});
        console.log("b = ",b);
        console.log(b.reportedPosts);
        setSubgreddits(b);
        setReportedPosts(b.reportedPosts);
        if(b.reportedPosts !== undefined) 
        {
            setReportedPosts(b.reportedPosts);
            var pinfo = {};
            console.log("posts = ",b.reportedPosts);
            for(let i =0 ; i < b.reportedPosts.length; i++)
            {
                const otheruser = await getReportbyId({id:b.reportedPosts[i]});
                console.log("-- ",otheruser)
                pinfo[b.reportedPosts[i]] = otheruser;
            }
    
            setReportsInfo(pinfo);
            console.log("pinfo = ",pinfo)
            // console.log("pinfo[a] = ",pinfo['ishwarbb25@gmail.com'].userName)
        }
    }
    promiseB();
},[]);

    const handleBlockUser = (sgid,blockeduser,rid) => {
        var time = 10;

        setInterval(() => {
            setCancelBlock(time);
            time--;

            console.log("Hewwo");

            if(time === -1)
            {
                console.log("Hello");
                blockUser({
                    sgid : sgid,
                    blockeduser : blockeduser,
                    rid : rid
                })
                window.location.reload(true);  
            }
        },1000);
    };

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
                            Reported Posts
                        </Typography>
                            <List >
                            {
                                reportedPosts.map((report) =>
                                (
                                    <>
                                        <Card sx={{ maxWidth: 860, width: 860 }} >
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
                                                title={reportsInfo[report] ? "Reported by " + reportsInfo[report].reportedby : "-"}
                                                subheader={reportsInfo[report] ? "Posted by " + reportsInfo[report].postedby : "-"}
                                                // subheader={reportsInfo[report] ? "Post id = " + reportsInfo[report].pid : "-"}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom maxWidth={900} paragraph sx={{ color: red[500] }}>
                                                    Concern : {reportsInfo[report] ? reportsInfo[report].concern : "-"}
                                                </Typography>
                                                <Typography gutterBottom maxWidth={900} paragraph>
                                                    Text : {reportsInfo[report] ? reportsInfo[report].text: "-"}
                                                </Typography>
                                            </CardContent>
                                            {reportsInfo[report] ? (!reportsInfo[report].ignored ? 
                                            (<CardActions>
                                                {(cancelBlock === 0) ? 
                                                (<Button color="secondary" onClick={() => {
                                                    // blockUser({
                                                    //     sgid : subgreddits._id,
                                                    //     blockeduser : reportsInfo[report].postedby
                                                    // })
                                                    handleBlockUser(subgreddits._id,reportsInfo[report].postedby,reportsInfo[report]._id);
                                                }} >
                                                    Block User <BlockIcon />
                                                </Button>)
                                                :
                                                (<Button color="secondary" variant="outlined" onClick={() => {window.location.reload(true);}} >
                                                    Cancel in {cancelBlock} <CloseIcon />
                                                </Button>)
                                            }
                                                <Button color="secondary">
                                                    Delete Post <DeleteIcon />
                                                </Button>
                                                <Button color="secondary" onClick={() => {
                                                    IgnoreReport(reportsInfo[report]);
                                                    window.location.reload(true);                                                   
                                                }}>
                                                    Ignore <NotificationsPausedIcon />
                                                </Button>
                                            </CardActions>) 
                                            :
                                            (<CardActions>
                                                <Button color="secondary" disabled>
                                                    Ignored <NotificationsPausedIcon />
                                                </Button>
                                            </CardActions>) )
                                            : ""
                                            }
                                        </Card>
                                        <br></br>
                                    </>
                                ))
                            }
                            </List>
                        </Grid>
                        </CardContent> </Card>
            </Grid> 
        </div>
     );
}
 
export default MSGInstanceUsers;