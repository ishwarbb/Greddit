import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import { getOtherUserInfo, getPostsbyId, getUserInfo, removeSavedPostbyId } from "./misc";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Auth from "./Auth";

const SavedPosts = () => {
    const [usrData, setUsrData] = useState(null);
    const [savedPosts, setSavedPosts] = useState(null);
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            console.log(a);
            setUsrData(a);
            const b = a.savedPosts;
            console.log(b);
            setSavedPosts(b);

            if(b !== undefined) 
            {
                var pinfo = {};
                console.log("posts = ",b);
                for(let i =0 ; i < b.length; i++)
                {
                    const post = await getPostsbyId({id:b[i]});
                    pinfo[b[i]] = post;
                }
        
                setPostInfo(pinfo);
                console.log("pinfo = ",pinfo)
                // console.log("pinfo[a] = ",pinfo['ishwarbb25@gmail.com'].userName)
            }
        };

        promiseB();
    }, []);

    if(!usrData) return <Auth/>
    return (
        <>
            <Box marginTop='150px' marginLeft='100px' marginBottom='50px' alignItems="center" justifyContent="center" >
            </Box>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                // justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                {
                    savedPosts ? savedPosts.map((savedPost) =>
                    (
                        <>
                            <Card sx={{ maxWidth: 900, width: 900 }}>
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
                                    title={postInfo[savedPost] ? "Posted by " + postInfo[savedPost].postedBy : "This Post is Unavailable"}
                                    subheader={postInfo[savedPost] ? "Posted in " + postInfo[savedPost].postedIn : "This Post is Unavailable"}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* People : {subgreddit.people.length}  Posts : {subgreddit.posts.length} */}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* Banned KeyWords: {subgreddit.bannedKeywords.join(", ")} */}
                                    </Typography>
                                    <Typography gutterBottom maxWidth={900} paragraph>
                                          {postInfo[savedPost] ? postInfo[savedPost].text : "This Post is Unavailable"}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Typography>
                                        {savedPost.upvotes}
                                    </Typography>
                                    <IconButton aria-label="downvote">
                                        <ThumbDownIcon />
                                    </IconButton>
                                    <Typography>
                                        {savedPost.downvotes}
                                    </Typography>
                                    <Button color="secondary">
                                        Comment <CommentIcon />
                                    </Button>
                                    <Button color="secondary" onClick={() => {removeSavedPostbyId({postid : savedPost}); window.location.reload(true); } }  >
                                        Unsave <SaveIcon />
                                    </Button>
                                    <Button color="secondary">
                                        Follow User <GroupAddIcon />
                                    </Button>
                                </CardActions>
                                <Typography color="secondary">
                                                    Comments : {postInfo[savedPost] ? postInfo[savedPost].comments.length : "-"}
                                </Typography>
                                {postInfo[savedPost] ? postInfo[savedPost].comments.map((comment) => (
                                                <List>
                                                    <ListItem button>
                                                        <ListItemAvatar>
                                                            <Avatar alt="Profile Picture"> R </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={usrData.userName} secondary={comment} />
                                                    </ListItem>
                                                </List>
                                            )) : (<></>)
                            }
                            </Card>
                            <br></br>
                        </>
                    )
                    ) : "Hi"
                }


            </Grid>
        </>
    );
}

export default SavedPosts;