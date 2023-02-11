import { Avatar, Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import Followers from "./Followers";
import Following from "./Following";
import { followerEmails } from "./Followers";
import { followingEmails } from "./Following";
import axios from "axios";

async function updateData(reqdata)
{
    const response = await axios.post(
    "/updatedata",
    reqdata
    );
    if (response.status === 200) {
        console.log("Success");
    } else {
    console.log("error");
    }
}

const ProfilePage = () => {
    let loggedinUser = localStorage.getItem('logged in');
    console.log(loggedinUser)

    function mylink(link, name) {
        return <Link href={link} underline="hover"> {name} </Link>
    };

    const [submit, setSubmit] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    const [msg, setMsg] = useState(null);

    const fieldErrorValues = {
        "email": false,
        "password": false,
        "username": false,
        "firstname": false,
        "lastname": false,
        "age": false,
        "contactnumber": false
    }

    const [fieldErrors, setFieldErrors] = useState(fieldErrorValues);

    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);


    if (loggedinUser === null || loggedinUser === 'null') {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Typography variant="h4">
                    You are NOT logged in
                </Typography>
                <Typography>
                    Please {mylink("/login", "login")}if you want to view your profile.
                </Typography>
            </Grid>
        );
    }

    let userdata = localStorage.getItem(loggedinUser);
    userdata = JSON.parse(userdata)

    const ErrorMsg = () => {
        return (
            <Typography color="red">
                {msg}
            </Typography>
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        const fieldErrorValues = {
            "email":false,
            "password": false,
            "username": false,
            "firstname": false,
            "lastname": false,
            "age": false,
            "contactnumber": false
        }

        setFieldErrors(fieldErrorValues);
        let noAccept = 0;

        if (data.get('password') === "") {
            fieldErrorValues['password'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }
    
        if (data.get('username') === "") {
            fieldErrorValues['username'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }

        if (data.get('firstname') === "") {
            fieldErrorValues['firstname'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }

        if (data.get('lastname') === "") {
            fieldErrorValues['lastname'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }

        if (data.get('age') === "") {
            fieldErrorValues['age'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }

        if (data.get('contactnumber') === "") {
            fieldErrorValues['contactnumber'] = true;
            setFieldErrors(fieldErrorValues);
            noAccept = 1;
        }

        if (noAccept) {
            setMsg("Please enter valid entries");
            return;
        }

        let userdata = {
            email: loggedinUser,
            username: data.get('username'),
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            age: data.get('age'),
            contactnumber: data.get('contactnumber')
        };

        console.log(userdata);

        localStorage.setItem(userdata.email, JSON.stringify(userdata));
        updateData(userdata);

        setSubmit(0);
        setIsDisabled(true);
    };
    
    const handleClickOpenFollowers = () => {
        setOpenFollowers(true);
    };

    const handleCloseFollowers = (value) => {
        setOpenFollowers(false);
    };

    const handleClickOpenFollowing = () => {
        setOpenFollowing(true);
    };

    const handleCloseFollowing = (value) => {
        setOpenFollowing(false);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Avatar sx={{ bgcolor: "gray", width: 100, height: 100}} variant="square">
                A
            </Avatar>

            <Grid item xs={16}
                display="flex"
                justifyContent="space-between"
                paddingTop={2}
            >
                <Button onClick={handleClickOpenFollowers}>
                    Followers : {followerEmails.length}
                </Button>
                <Button onClick={handleClickOpenFollowing}>
                    Following : {followingEmails.length}
                </Button>
            </Grid>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, marginLeft: 5, marginRight: 5, width: 800 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            error={fieldErrors['firstname']}
                            variant="standard"
                            defaultValue={userdata.firstname}
                            disabled={isDisabled}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            error={fieldErrors['lastname']}
                            variant="standard"
                            defaultValue={userdata.lastname}
                            disabled={isDisabled}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="userName"
                            label="User Name"
                            name="username"
                            autoComplete="User Name"
                            error={fieldErrors['username']}
                            variant="standard"
                            defaultValue={userdata.username}
                            disabled={isDisabled}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            defaultValue={userdata.email}
                            error={fieldErrors['email']}
                            disabled={true}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="age"
                            name="age"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            autoFocus
                            error={fieldErrors['age']}
                            variant="standard"
                            defaultValue={userdata.age}
                            disabled={isDisabled}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="contactNumber"
                            label="Contact Number"
                            name="contactnumber"
                            autoComplete="contact-number"
                            error={fieldErrors['contactnumber']}
                            variant="standard"
                            defaultValue={userdata.contactnumber}
                            disabled={isDisabled}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => {
                            setSubmit(1);
                            setIsDisabled(false);
                        }} >
                            Click Here to Edit
                        </Button>
                    </Grid>
                </Grid>

                <ErrorMsg />
                {!submit ||
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save Changes
                    </Button>
                }

            </Box>
            <Followers open={openFollowers} onClose={handleCloseFollowers} />             
            <Following open={openFollowing} onClose={handleCloseFollowing} />             
        </Grid>
    );
}

export default ProfilePage;