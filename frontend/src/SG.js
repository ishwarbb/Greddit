import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { addComments, getPosts, getPostsbyPostedIn, getSubGredditInfobyID, getUserInfo } from "./misc";
import { useParams } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FlagIcon from '@mui/icons-material/Flag';
import Auth from "./Auth";

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
        { targetemail: targetemail }
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
        console.log("error");
    }
}

async function savepost(postid) {
    const response = await axios.post(
        "/savepost",
        { postid: postid }
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
        console.log("error");
    }
}

async function reportPost(data) {
    const response = await axios.post(
        "/reportpost",
        data
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
    const [open2, setOpen2] = useState(false);
    const [usrData, setUsrData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [subGredditData, setSubGredditData] = useState([]);
    const [reportedpid, setReportedPid] = useState(null);
    const [reportedtext, setReportedText] = useState(null);

    const [openWarning, setOpenWarning] = useState(false);
    const handleWarningOpen = () => setOpenWarning(true);
    const handleWarningClose = () => {
        setOpenWarning(false);
        window.location.reload(true);
    }

    const [commentForm, setCommentForm] = useState(null);

    const inputRef = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };


    useEffect(() => {
        let promiseB = async () => {
            const a = await getUserInfo();
            const b = await getPostsbyPostedIn({ id: id });
            const c = await getSubGredditInfobyID({ id: id });
            console.log("a = ", a);
            console.log("a.email = ", a.email);
            console.log("b = ", b);
            console.log("c = ", c);
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

        createPost(postdata, subGredditData);

        console.log("posting=", postdata);

        handleClose();
        // window.location.reload(true);

        var text = data.get('text');
        var x = subGredditData.bannedKeywords;
        x = x.filter(a => text.trim().toLowerCase().includes(a.trim().toLowerCase()));
        if(x.length > 0)
        {
            handleWarningOpen();
        }else
        {
        window.location.reload(true);
        }
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log("submitted report =", data);
        console.log("submitted report =", data.get('concern'));

        let postdata = {
            pid: reportedpid,
            sgid: subGredditData._id,
            concern: data.get('concern'),
            text: reportedtext
        };

        reportPost(postdata);
        console.log("reporting =", postdata);

        handleClose();
        window.location.reload(true);
    };

    const handleCommentSubmit = (event, post) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log("comment = ", data.get('comment'));
        console.log("on post = ", commentForm);

        var comment = usrData.userName.fontcolor("green") + ":  " + data.get('comment');

        addComments({ pid: commentForm, comment: comment });
        window.location.reload(true);

    }

    if(!usrData) return <Auth/>
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
                            <Dialog open={open2} onClose={handleClose2} component="form" noValidate onSubmit={handleSubmit2} >
                                <DialogTitle>Report this Post</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        We promise to be responsible and look into the matter, please share your concern. Thank You
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="concern"
                                        name="concern"
                                        label="Text"
                                        multiline
                                        rows={5}
                                        fullWidth
                                        variant="standard"
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose2}>Cancel</Button>
                                    <Button type="submit" color="warning" >Report</Button>
                                </DialogActions>
                            </Dialog>
                            <Modal
        open={openWarning}
        onClose={handleWarningClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            // bgcolor: "background.paper",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" color="warning">
            Your post has banned keywords. It might get reported by community members and may get you blocked
          </Typography>
        </Card>
      </Modal>
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
                                                <Button color="secondary" onClick={() => setCommentForm(post._id)} >
                                                    Comment <CommentIcon />
                                                </Button>
                                                <Button color="secondary" onClick={() => savepost(post._id)}>
                                                    Save <SaveIcon />
                                                </Button>
                                                <Button disabled={usrData.email === subGredditData.creator ? true : false}
                                                color="secondary" onClick={() => followuser(post.postedBy)}>
                                                    Follow User <PersonAddAlt1Icon />
                                                </Button>
                                                {/* <Button color="secondary" onClick={() => reportPost(post._id,subGredditData._id)} > */}
                                                <Button color="secondary" 
                                                disabled={usrData.email === subGredditData.creator ? true : false}
                                                onClick={() => {
                                                    setReportedPid(post._id);
                                                    setReportedText(post.text);
                                                    handleClickOpen2();
                                                }} >
                                                    Report <FlagIcon />
                                                </Button>
                                            </CardActions>
                                            {commentForm === post._id ?
                                                <>
                                                    <Box component="form" noValidate onSubmit={handleCommentSubmit} sx={{ mt: 1 }}>
                                                        <Container>
                                                            Add Comment :
                                                            <TextField
                                                                size="small"
                                                                id="comment"
                                                                name="comment"
                                                                ref={inputRef}
                                                                variant="standard"
                                                                color="secondary"
                                                                backgroundcolor="#ffffff"
                                                                style={{ marginLeft: "15px", marginRight: "15px", width: "600px" }}
                                                            />
                                                            <Button color="secondary" variant="contained" type="submit">
                                                                Submit
                                                            </Button>
                                                        </Container>
                                                    </Box>

                                                </> : <></>
                                            }
                                            <Container>
                                                <Typography  variant="button" color="secondary" gutterBottom>
                                                    Comments : {post.comments.length}
                                                </Typography>
                                            </Container>
                                            {post.comments.map((comment) => (
                                                <List>
                                                    <ListItem button>
                                                        <ListItemAvatar>
                                                            <Avatar alt="Profile Picture"> R </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary={comment}  />
                                                    </ListItem>
                                                </List>
                                            ))
                                            }
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