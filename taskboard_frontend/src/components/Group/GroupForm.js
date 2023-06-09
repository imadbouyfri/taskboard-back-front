import { TextField, Grid, Button, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BoardForm({ openPopup, setOpenPopup }) {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const styles = {
    form: {
      display: flexbox,
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const token = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/group",
        { name, description },
        config
      );
      // Handle the response if needed
      console.log(response);
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
    }
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
                onChange={(e) => setName(e.target.value)}
                sx={styles.inputStyle}
              />
              <TextField
                variant="outlined"
                label="Group Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={styles.inputStyle}
              />
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  variant="contained"
                  children="Submit"
                  size="large"
                  sx={styles.submit}
                />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

export default BoardForm;
