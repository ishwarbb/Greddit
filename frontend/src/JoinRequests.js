import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubGredditInfobyID } from "./misc";
import MSGInstanceBar from "./MSGInstanceBar";

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
                <Typography variant="h4" textAlign="center">
                    Users requesting to join this SubGreddit:
                    {requestingpeople.map(a => (<Typography>{a}</Typography>))}
                </Typography>
            </Grid> 
        </div>
     );
}
 
export default MSGInstanceJoinRequests;