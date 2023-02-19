import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@mui/material";
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
import { getPosts, getPostsbyId, getSubGredditInfobyID, getUserInfo } from "./misc";
import { useParams } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

async function createPost(data) {
    const response = await axios.post(
        "/createpost",
        data
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
        console.log("error");
    }
}

async function followuser(targetemail) {
    const response = await axios.post(
        "/followUser",
        {targetemail : targetemail}
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
        console.log("error");
    }
}

const SG = () => {
    let { id } = useParams();
    const [open, setOpen] = useState(false);
    const [usrData, setUsrData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [subGredditData,setSubGredditData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };


    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            const b = await getPostsbyId({id : id});
            const c = await getSubGredditInfobyID({id : id});
            console.log("a = ", a);
            console.log("a.email = ", a.email);
            console.log("b = ", b);
            console.log("c = ",c);
            setUsrData(a);
            setPosts(b);
            setSubGredditData(c);
        };

        promiseB();
    }, []);

    // console.log("pjs = ",posts);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log("submitted post =", data)

        let postdata = {
            postedBy: usrData.email,
            text: data.get('text'),
            postedIn: id,
            upvotes: 0,
            downvotes: 0
        };

        createPost(postdata,subGredditData);

        console.log("posting=", postdata);

        handleClose();
        window.location.reload(true);
    };

    const followUser = (targetemail) => {
        followuser(targetemail)
    }

    return (
        <>
            <Box marginTop='150px' marginLeft='100px' marginBottom='50px' alignItems="center" justifyContent="center" >
                <Button variant="contained" color="secondary" onClick={handleClickOpen} >Create Post</Button>
            </Box>


            <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                // alignItems="stretch"
            >

                <Grid item xs={12} sm={3} style={{ height: "100%" }} >
                    <Container>
                        <img
                            // src="../assets/catgroup.png"
                            src={require('./catgroup.png')}
                            loading="lazy"
                            alt="hewwo"
                            width={250} height={250}
                        />
                        <Typography variant="h3">
                            {subGredditData.name}
                        </Typography>
                        <Typography variant="h5">
                            {subGredditData.description}
                        </Typography>
                        <Typography variant="h5">
                            Posts : {subGredditData.posts ? subGredditData.posts.length : "-"}
                        </Typography>
                    </Container>
                </Grid>

                <Grid item xs={12} sm={9}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        // justifyContent="center"
                        style={{ minHeight: '100vh' }}
                    >
                        <Grid item>
                        <Dialog open={open} onClose={handleClose} component="form" noValidate onSubmit={handleSubmit} >
                            <DialogTitle>Create Post</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To create a new post, please enter the details here. Please do not you banned words.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="text"
                                    name="text"
                                    label="Text"
                                    multiline
                                    rows={10}
                                    fullWidth
                                    variant="standard"
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" >Create</Button>
                            </DialogActions>
                        </Dialog>
                        {
                            posts.map((post) =>
                            (
                                <>
                                    <Card sx={{ maxWidth: 900, width: 900 }} >
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
                                            title={"posted by " + post.postedBy}
                                            subheader={"posted in " + post.postedIn}
                                        />
                                        <CardContent>

                                            <Typography gutterBottom maxWidth={900} paragraph>
                                                {post.text}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton aria-label="upvote">
                                                <ThumbUpIcon /> 
                                            </IconButton>
                                            <Typography>
                                                {post.upvotes}
                                            </Typography>
                                            <IconButton aria-label="downvote">
                                                <ThumbDownIcon />
                                            </IconButton>
                                            <Typography>
                                                {post.downvotes}
                                            </Typography>
                                            <Button color="secondary">
                                                Comment <CommentIcon/>
                                            </Button>
                                            <Button color="secondary">
                                                Save <SaveIcon/>
                                            </Button>
                                            <Button color="secondary" onClick={followUser(post.postedBy)}>
                                                Follow User <GroupAddIcon/>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                    <br></br>
                                </>
                            ))
                        }

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default SG;