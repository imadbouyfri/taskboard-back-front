import { TextField, Grid, Button, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function GroupForm({ recordUpdate, openPopup, setOpenPopup }) {
  const [state, setState] = useState(recordUpdate ? recordUpdate : { name: "", description: "" });
  const { name, description } = state;
  const { user } = useSelector((state) => state.auth);

  const styles = {
    form: {
      display: "flex",
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    inputStyle: {
      width: "100%",
      "&:not(:last-child)": {
        marginBottom: 5,
      },
    },
    title: {
      fontSize: 25,
      marginBottom: 50,
    },
    submit: {
      textAlign: "center",
    },
    paper: {
      margin: "auto",
      paddingTop: 2,
      paddingBottom: 8,
      paddingLeft: 5,
      paddingRight: 5,
      width: "100%",
    },
  };

  if (!user) return null;
  const token = user.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const addGroup = async (data) => {
    try {
      // Set the creator ID in the data object
      data.creator = user._id;
  
      await axios.post("http://localhost:3001/group", data, config);
      Swal.fire("Success", "Group added successfully!", "success");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  

  const updateGroup = (data) => {
    axios
      .patch(`http://localhost:3001/group/${state._id}`, { name: data.name, description: data.description }, config)
      .then((res) => {
        Swal.fire("Success", "Group updated successfully!", "success");
        console.log(res.data);
      })
      .catch((err) => {
        Swal.fire("Error", "You don't have admin access!", "error");
        console.log(err);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!state._id) {
      addGroup(state);
    } else {
      updateGroup(state);
    }
    setOpenPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Paper elevation={0} sx={styles.paper}>
        <form onSubmit={handleOnSubmit}>
          <Grid container sx={styles.container}>
            <Grid item>
              <TextField
                variant="outlined"
                label="Group Name"
                name="name"
                value={name}
                onChange={handleInputChange}
                sx={styles.inputStyle}
              />
              <TextField
                variant="outlined"
                label="Group Description"
                name="description"
                value={description}
                onChange={handleInputChange}
                sx={styles.inputStyle}
              />
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained" children="Submit" size="large" sx={styles.submit} />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default GroupForm;
