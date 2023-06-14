import { TextField, Grid, Button, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function GroupForm({ recordUpdate, openPopup, setOpenPopup, GetGroups }) {
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
      await axios.post("http://localhost:3001/group", data, config);
      GetGroups();
    } catch (err) {
      console.log(err);
    }
  };

  const updateGroup = (data) => {
    axios
      .patch(`http://localhost:3001/group/${state._id}`, { name: data.name, description: data.description }, config)
      .then((res) => {
        GetGroups();
        console.log(res.data);
      })
      .catch((err) => {
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
