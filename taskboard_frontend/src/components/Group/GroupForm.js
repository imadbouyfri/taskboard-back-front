import { TextField, Grid, Button, Stack, Paper } from "@mui/material";
import { flexbox } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BoardForm({ recordUpdate, openPopup, setOpenPopup }) {
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



    const handleOnSubmit = (e) => {
    e.preventDefault();
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
                sx={styles.inputStyle}
                />
                <TextField
                variant="outlined"
                label="Group Description"
                name="descData"
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
