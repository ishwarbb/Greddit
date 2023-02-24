import { Alert, AlertTitle, AppBar, Avatar, Backdrop, breadcrumbsClasses, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Grid, TextField, Toolbar } from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from "react";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllGredditInfo, getJoinedSubgreddits, getUserInfo, joinSubgreddit, leaveSubgreddit, requestSubgreddit, UpdateDVVD } from "./misc";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SGBar from "./SubGredditBar";
import Auth from "./Auth";

// const Fuse = require('fuse.js');
import Fuse from "fuse.js";
// import * as Fuse from 'fuse.js';


function IsContainedin(Array, element) {
    for (let i = 0; i < Array.length; i++) {
        if (Array[i]._id === element._id) return true;
    }
    return false;
}

function IsContained(Array, element) {
    for (let i = 0; i < Array.length; i++) {
        if (Array[i] === element) return true;
    }
    return false;
}

function Intersection(Array1, Array2) {
    var ans = [];
    for (let i = 0; i < Array1.length; i++) {
        if (IsContainedin(Array2, Array1[i])) ans.push(Array1);
    }
    return ans;
}

function Difference(Array1, Array2) { // Array1 - Array2
    var ans = [];
    for (let i = 0; i < Array1.length; i++) {
        if (!IsContainedin(Array2, Array1[i])) ans.push(Array1);

    }
    return ans;
}

function NameASort(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
}

function NameDSort(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
    return 0;
}

function FollowersSort(a, b) {
    if (a.people.length > b.people.length) return -1;
    if (a.people.length < b.people.length) return 1;
    return 0;
}

function CreationSort(a, b) {
    if (a.creationDate > b.creationDate) return -1;
    if (a.creationDate < b.creationDate) return 1;
    return 0;
}



function f1(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() === b.name.toLowerCase()) {
        if (a.people.length > b.people.length) return -1;
        if (a.people.length < b.people.length) return 1;
        if (a.people.length === b.people.length) {
            return CreationSort(a, b);
        }
    }
}

function f2(a, b) {
    if (a.people.length > b.people.length) return -1;
    if (a.people.length < b.people.length) return 1;
    if (a.people.length === b.people.length) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() === b.name.toLowerCase()) {
            return CreationSort(a, b);
        }
    }
}

function f3(a, b) {
    if (a.creationDate > b.creationDate) return -1;
    else if (a.creationDate < b.creationDate) return 1;
    else {
        if (a.people.length > b.people.length) return -1;
        else if (a.people.length < b.people.length) return 1;
        else {
            return NameASort(a,b);
        }
    }
}

function f4(a, b) {
    if (a.people.length > b.people.length) return -1;
    else if (a.people.length < b.people.length) return 1;
    else {
        if (a.creationDate > b.creationDate) return -1;
        else if (a.creationDate < b.creationDate) return 1;
        else {
            return NameASort(a,b);
        }
    }
}

function f5(a, b) {
    if (a.people.length > b.people.length) return -1;
    else if (a.people.length < b.people.length) return 1;
    else {
        if (a.creationDate > b.creationDate) return -1;
        else if (a.creationDate < b.creationDate) return 1;
        else {
            return FollowersSort(a,b);
        }
    }
}


function f6(a, b) {
    if (a.creationDate > b.creationDate) return -1;
    else if (a.creationDate < b.creationDate) return 1;
    else {
        if (a.people.length > b.people.length) return -1;
        else if (a.people.length < b.people.length) return 1;
        else {
            return FollowersSort(a,b);
        }
    }
}

const SubGredditsPage = () => {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState("");
    const [sort, setSort] = useState("");

    const [load, setLoad] = useState(false);
    const [alert, setAlert] = useState(null);
    const [rsg, setrsg] = useState(null);

    const [usrData, setUsrData] = useState(null);
    const [subgreddits, setSubgreddits] = useState([]);
    const [showSubgreddits, setShowSubgreddits] = useState([]);
    const [joinedSubgreddits, setJoinedSubgreddits] = useState([]);
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState([]);

    function f0(a,b){
        if(IsContainedin(joinedSubgreddits,a) && !IsContainedin(joinedSubgreddits,b)) return -1;
        if(IsContainedin(joinedSubgreddits,b) && !IsContainedin(joinedSubgreddits,a)) return 1;
        return 0;
    }

    useEffect(() => {
        let promiseB = async () => {
            const a = await getAllGredditInfo();
            const b = await getJoinedSubgreddits();
            const c = await getUserInfo();

            console.log(a);
            console.log(b);
            console.log(c);
            setSubgreddits(a);
            setShowSubgreddits(a.sort(f0));
            setJoinedSubgreddits(b);
            console.log(b.includes(a[6]));
            setUsrData(c);
            setLoad(false);

        };

        promiseB();
    }, [rsg]);

    useEffect(() => {
        if (load !== false) {
            let promiseC = async (sgid) => {
                console.log("sgid ", sgid);
                var res = await requestSubgreddit({ sgid: sgid });
                setrsg(1);
                console.log(res);
                if (res === 200) {
                    // setLoad(false);
                }
            }
            promiseC(rsg);
        }
    }, [load]);


    useEffect(() => {
        // var newSubgreddits = subgreddits.filter(a => a.name.trim().toLowerCase().includes(search.trim().toLowerCase()));
        var newSubgreddits = subgreddits;

        var appliedTags = tags.split(',').map(item => item.trim().toLowerCase());
        console.log(appliedTags);
        console.log(appliedTags === ['']);
        console.log(appliedTags.length === 1 && appliedTags[0] === '');
        if (appliedTags !== [] && !(appliedTags.length === 1 && appliedTags[0] === '')) {
            newSubgreddits = newSubgreddits.filter(
                (a) => {
                    for (let i = 0; i < appliedTags.length; i++) {
                        for (let j = 0; j < a.tags.length; j++) {
                            if (a.tags[j] === appliedTags[i]) return true;
                        }
                    }
                    return false;
                }
            );
        }

        setShowSubgreddits(newSubgreddits);
        // var newSubgreddits = subgreddits;

        var appliedSorts = sort.split(',').map(item => item.trim().toLowerCase());
        console.log(appliedSorts);
        console.log(newSubgreddits);
        if(appliedSorts !== [] && appliedSorts[0] === '')
        {
            newSubgreddits.sort(f0);
            setShowSubgreddits(newSubgreddits);
        }
        else if (appliedSorts !== [] && !(appliedSorts[0] === '')) {
            if (appliedSorts.length === 1) {
                console.log(1);
                if (appliedSorts[0] === "name") newSubgreddits.sort(NameASort);
                if (appliedSorts[0] === "followers") newSubgreddits.sort(FollowersSort);
                if (appliedSorts[0] === "creation date") 
                {
                    console.log("sk");
                    newSubgreddits.sort(CreationSort);
                }
            }

            else if (appliedSorts.length === 2) {
                console.log(2);
                if (appliedSorts[0] === "name" && appliedSorts[1] === "followers")
                    newSubgreddits.sort(f1);
                if (appliedSorts[0] === "name" && appliedSorts[1] === "creation date")
                    newSubgreddits.sort(f5);
                if (appliedSorts[0] === "followers" && appliedSorts[1] === "name")
                    newSubgreddits.sort(f2);
                if (appliedSorts[0] === "followers" && appliedSorts[1] === "creation date")
                    newSubgreddits.sort(f4);
                if (appliedSorts[0] === "creation date" && appliedSorts[1] === "followers")
                    newSubgreddits.sort(f3);
                if (appliedSorts[0] === "creation date" && appliedSorts[1] === "name")
                    newSubgreddits.sort(f6);
            }

            else if (appliedSorts.length === 3) {
                console.log(3);
                if (appliedSorts[0] === "name" && appliedSorts[1] === "followers" && appliedSorts[2] === "creation date")
                    newSubgreddits.sort(f1);
                if (appliedSorts[0] === "followers" && appliedSorts[1] === "name" && appliedSorts[2] === "creation date")
                    newSubgreddits.sort(f2);
                if (appliedSorts[0] === "name" && appliedSorts[1] === "creation date" && appliedSorts[2] === "followers")
                    newSubgreddits.sort(f5);
                if (appliedSorts[0] === "followers" && appliedSorts[1] === "creation date" && appliedSorts[2] === "name")
                    newSubgreddits.sort(f4);
                if (appliedSorts[0] === "creation date" && appliedSorts[1] === "followers" && appliedSorts[2] === "name")
                    newSubgreddits.sort(f3);
                if (appliedSorts[0] === "creation date" && appliedSorts[1] === "name" && appliedSorts[2] === "followers")
                    newSubgreddits.sort(f6);
            }
            else
            {
                newSubgreddits.sort(f0);
                setShowSubgreddits(newSubgreddits);
            }
            setShowSubgreddits(newSubgreddits);
        }
        console.log(newSubgreddits);

        console.log("hewwo");
    }, [tags, sort]);

    useEffect(() => {
        if(search !== null)
        {
            const fuse = new Fuse(subgreddits, {
                keys: ["name"]
            })
            var newSubgreddits = fuse.search(search).map(x => x.item);
            setShowSubgreddits(newSubgreddits);
        }
    },[search]);

    if (!usrData) return <Auth />
    return (
        <>
            <Box marginTop='102px' marginLeft='100px' marginBottom='50px' alignItems="center" justifyContent="center" >
            </Box>

            <Box sx={{ flexGrow: 1 }}>

                <AppBar
                    position="static"
                    sx={{ backgroundColor: "#f3e5f5" }}
                >
                    <Toolbar>
                        {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color= "secondary" 
                        sx={{ display: { xs: "none", sm: "block" }}}
                    >
                        Search
                    </Typography> */}
                        <Button variant="contained" color="secondary">
                            Search
                        </Button>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="standard"
                            color="secondary"
                            backgroundcolor="#ffffff"
                            style={{ marginLeft: "15px", marginRight: "15px" }}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value.trim());
                                // console.log("search = ",search)
                            }}
                        // onKeyDown={(ev) => {
                        //     console.log(`Pressed keyCode ${ev.key}`);
                        //     if (ev.key === 'Enter') {
                        //         window.location.reload(true);
                        //     }
                        //     console.log("search = ", search)
                        // }}
                        />

                        {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        color= "secondary" 
                        sx={{ display: { xs: "none", sm: "block" }}}
                    >
                        Filter
                    </Typography> */}
                        <Button variant="contained" color="secondary" >
                            Filter
                        </Button>
                        <TextField
                            id="outlined-basic"
                            label="Tags (Comma Seperated)"
                            variant="standard"
                            color="secondary"
                            backgroundcolor="#ffffff"
                            style={{ marginLeft: "15px", marginRight: "15px" }}
                            onChange={(e) => {
                                var newTags = e.target.value;
                                setTags(newTags);
                                console.log("tag = ", tags);
                            }}
                        />

                        <Button variant="contained" color="secondary" >
                            Sort
                        </Button>
                        <TextField
                            id="outlined-basic"
                            label="Sort (Comma Seperated)"
                            variant="standard"
                            color="secondary"
                            backgroundcolor="#ffffff"
                            style={{ marginLeft: "15px", marginRight: "15px" }}
                            onChange={(e) => {
                                var newSort = e.target.value;
                                setSort(newSort);
                                console.log("tag = ", tags);
                            }}
                        />
                    </Toolbar>
                </AppBar>
            </Box>


            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                // justifyContent="center"
                style={{ minHeight: '100vh', marginTop: '20px' }}
            >
                {alert &&
                    (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open
                            onClick={() => setAlert(0)}
                        >
                            <Alert severity="error">
                                <AlertTitle>Not Allowed</AlertTitle>
                                You cant join this subgreddit <strong> As you already left it!</strong>
                            </Alert>
                        </Backdrop>
                    )
                }

                {showSubgreddits.map((subgreddit) =>
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
                                title={subgreddit.name}
                                subheader={subgreddit.tags.join('-')}
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
                            <CardActions >
                                <Button color="secondary" onClick={() => {
                                    UpdateDVVD({ sgid: subgreddit._id });
                                    window.location.replace("/subgreddits/" + subgreddit._id);
                                }}>
                                    Open <OpenInBrowserIcon />
                                </Button>

                                {/* { joinedSubgreddits.includes(subgreddit) && */}

                                {
                                    !IsContainedin(joinedSubgreddits, subgreddit) ?
                                        (!IsContained(subgreddit.requestingpeople, usrData.email) ?
                                            (<Button color="secondary" disabled={load} onClick={
                                                async (x) => {
                                                    console.log("joining ", subgreddit._id);
                                                    setLoad(true);
                                                    console.log(usrData.leftsubgreddits);
                                                    if (!IsContainedin(usrData.leftsubgreddits, subgreddit)) {
                                                        setAlert(0);
                                                        setrsg(subgreddit._id);
                                                        // window.location.reload(true);
                                                    }
                                                    else {
                                                        setAlert(1);
                                                        console.log("You cant do that");
                                                        return;
                                                    }
                                                }}>
                                                Join {load && (usrData.email === subgreddit.creator) ? (<CircularProgress />) : (<></>)} <GroupAddIcon />
                                            </Button>) :
                                            (<Button color="secondary" disabled
                                                sx={{
                                                    "&.Mui-disabled": {
                                                        //   background: "#eaeaea",
                                                        color: "#ce93d8"
                                                    }
                                                }} >
                                                Join Pending
                                            </Button>)
                                        )
                                        :
                                        (<Button disabled={usrData.email === subgreddit.creator ? true : false}
                                            color="secondary"
                                            onClick={() => {
                                                console.log("leaving ", subgreddit._id);
                                                leaveSubgreddit({ sgid: subgreddit._id });
                                                window.location.reload(true);
                                            }}
                                        >
                                            Leave  <GroupAddIcon />
                                        </Button>)
                                }
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