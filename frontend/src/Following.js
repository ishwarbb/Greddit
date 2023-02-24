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


export default function Following(props) {
  const { onClose, open , following, user} = props;
  // var followingEmails = following.concat( ['admin@admin']);
  var followingEmails = following;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Following</DialogTitle>
      <List sx={{ pt: 0 }}>
        {followingEmails.map((email) => (
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
              Unfollow
                  <UnsubscribeIcon fontSize="large"sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: red[500] }} 
                    onClick={() => {
                      axios.post('/remove/removefollowing', { personRemoving : user, personToBeRemoved : email });
                      window.location.replace('/');
                  }}/>
            </Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

Following.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};