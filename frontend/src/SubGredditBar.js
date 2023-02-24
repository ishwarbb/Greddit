import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";

export default function SGBar() {
  const inputRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  // if(!usrData) return <Auth/>
  return (
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
            sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
          > */}
          <Button variant="contained" color="secondary">
            Search
            </Button>
          {/* </Typography> */}
          <TextField
            id="outlined-basic"
            label="Search"
            variant="standard"
            color="secondary"
            backgroundColor="#ffffff"
            style={{ marginLeft: "15px" }}
          />
        </Toolbar>

        <Toolbar>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
          >
            Tags
          </Typography> */}
        <Button variant="contained" color="secondary">
            Filter
            </Button>
          <TextField
            id="outlined-basic"
            label="Tags"
            variant="standard"
            color="secondary"
            backgroundColor="#ffffff"
            style={{ marginLeft: "15px" }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
