//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography } from '@mui/material';
import axios from "axios";
import { UserContext } from "../../../utils/UserContext";

const AddMusic = () => {
  const [title, setTitle] = useState('');
  const [artists, setArtists] = useState([]);
  const [dateReleased, setDateReleased] = useState('');
  const [album, setAlbum] = useState('');
  
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);

  const saveMusic = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("album", album);
    artists.forEach((artist) => formData.append("artists[]", artist.name));
    formData.append("dateReleased", dateReleased);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/addMusic`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity('success');
        setSnackbarMessage(
          'Music Added!',
        );
        setOpenSnackbar(true);
        setTitle('');
        setArtists([]);
        setDateReleased('');
        setAlbum('');
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in adding Music: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveMusic();
  };

  const handleArtistChange = (event) => {
    const newArtists = event.target.value.split(",").map((artist) => ({
      name: artist,
    }));
    setArtists(newArtists);
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>

            <Grid item>
              <Typography variant="h3" align="center" gutterBottom>
                Add A Song
              </Typography>
            </Grid>

            <form onSubmit={handleSubmit}>

              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Grid>
              
              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Artists"
                  variant="outlined"
                  fullWidth
                  required
                  value={artists.map((artist) => artist.name)}
                  onChange={handleArtistChange}
                  inputProps={{ style: { textTransform: 'capitalize' } }}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <InputLabel>Release Date</InputLabel>
                <Input
                  type="date"
                  fullWidth
                  required
                  value={dateReleased}
                  onChange={(event) => setDateReleased(event.target.value)}
                  inputProps={{ placeholder: "" }}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Album"
                  variant="outlined"
                  fullWidth
                  value={album}
                  onChange={(event) => setAlbum(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Song
                </Button>
              </Grid>

            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddMusic;