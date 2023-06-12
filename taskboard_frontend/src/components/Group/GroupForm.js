import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";

const GroupForm = ({ openPopup, setOpenPopup, recordUpdate, getGroups }) => {
  const [groupName, setGroupName] = useState(recordUpdate ? recordUpdate.name : "");
  const [groupDescription, setGroupDescription] = useState(recordUpdate ? recordUpdate.description : "");
  const { user } = useSelector((state) => state.auth);

  const handleClose = () => {
    setOpenPopup(false);
    setGroupName("");
    setGroupDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const groupData = {
      name: groupName,
      description: groupDescription
    };
  
    try {
      let response;
      if (recordUpdate) {
        response = await axios.patch(`http://localhost:3001/group/${recordUpdate._id}`, groupData, config);
        getGroups();
      } else {
        response = await axios.post("http://localhost:3001/group/", groupData, config);
        getGroups();
      }
      
      if (response.status === 200) {
        Swal.fire(
          'Saved!',
          'Your group has been saved.',
          'success'
        ).then(() => {
          handleClose();
        });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>{recordUpdate ? "Update Group" : "Add Group"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            required
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ marginBottom: '30px' }}
          />
          <TextField
            margin="dense"
            label="Group Description"
            type="text"
            fullWidth
            required
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            style={{ marginBottom: '30px' }}
          />
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GroupForm;
