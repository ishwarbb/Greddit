import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue, red } from '@mui/material/colors';
import { Button } from '@mui/material';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import axios from 'axios';


export default function Followers(props) {
  const { onClose, open, followers, user } = props;
  var followerEmails = followers.concat( ['admin@admin']);

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} >
      <DialogTitle>Followers</DialogTitle>
      <List sx={{ pt: 0 }}>
        {followerEmails.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
            <Button> 
                  <UnsubscribeIcon fontSize="large"sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: red[500] }}
                    onClick={() => {
                        axios.post('/remove/removefollowers', { personRemoving : user, personToBeRemoved : email });
                        window.location.replace('/');
                    }}/>
            </Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

Followers.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};