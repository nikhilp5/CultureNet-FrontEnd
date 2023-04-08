//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography} from '@mui/material';
import axios from "axios";

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateReleased, setDateReleased] = useState('');
  const [image, setImage] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}` +
        "/movie_genre",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setGenres(res.data);
      })
      .catch((error) => {
        alert("Error in fetching Genres: " + error);
      });
  }, []);

  const saveMovie = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateReleased", dateReleased);
    formData.append("director", director);
    selectedGenres.forEach((genre) => formData.append("genres[]", genre._id));
    formData.append("image", image);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/addMovie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Movie Added!");
        setTitle('');
        setDescription('');
        setDateReleased('');
        setImage('');
        setDirector('');
        setSelectedGenres([]);
        setPreviewImage('');
      })
      .catch((error) => {
        alert("Error in adding Movie: " + error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveMovie();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    setImage(null);
  };

  const handleSelectedGenresChange = (genre) => {
    let updatedSelectedGenres = [...selectedGenres];
    if (selectedGenres.includes(genre)) {
      updatedSelectedGenres = selectedGenres.filter((selectedGenre) => selectedGenre._id !== genre._id);
    } else {
      updatedSelectedGenres.push(genre);
    }
    setSelectedGenres(updatedSelectedGenres);
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
                <InputLabel>Release Date</InputLabel>
                <Input
                  type="date"
                  fullWidth
                  value={dateReleased}
                  onChange={(event) => setDateReleased(event.target.value)}
                  inputProps={{ placeholder: "" }}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <InputLabel sx={{ marginTop: 2 }}>Upload Movie Cover Image</InputLabel>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </Grid>

              {previewImage && (
                <Grid item sx={{ margin: 2 }}>
                  <img src={previewImage} alt="Preview" style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }} />
                  <button onClick={handleImageRemove}>Remove Image</button>
                </Grid>
              )}

              <Grid item sx={{ margin: 2 }}>
                <InputLabel id="genre-label">Select applicable Genres</InputLabel>
                {genres.map((genre) => (
                  <div key={genre._id}>
                    <input type="checkbox" id={genre._id} value={genre} checked={selectedGenres.includes(genre)} onChange={() => handleSelectedGenresChange(genre)} />
                    <label htmlFor={genre._id}>{genre.name}</label>
                  </div>
                ))}
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

export default AddMovie;