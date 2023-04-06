import React, { useState } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography } from '@mui/material';

const UpdateMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateReleased, setDateReleased] = useState('');
  const [image, setImage] = useState('');
  const [director, setDirector] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //onSubmit({ title, description, dateReleased, image, director });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>
          <Grid item>
              <Typography variant="h3" align="center" gutterBottom>
                Add A Movie
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Grid>
              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Director"
                  variant="outlined"
                  fullWidth
                  value={director}
                  onChange={(event) => setDirector(event.target.value)}
                />
              </Grid>
              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid item sx={{ margin: 2 }}>
                <InputLabel>Date Released</InputLabel>
                <Input
                  type="date"
                  fullWidth
                  value={dateReleased}
                  onChange={(event) => setDateReleased(event.target.value)}
                  inputProps={{ placeholder: "" }}
                />
              </Grid>
              <Grid item sx={{ margin: 2 }}>
                <InputLabel sx={{ marginTop: 2 }}>Upload Movie Image</InputLabel>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </Grid>
              <Grid item sx={{ margin: 2 }}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Movie
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UpdateMovie;