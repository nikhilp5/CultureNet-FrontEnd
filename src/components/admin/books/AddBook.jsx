//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography } from '@mui/material';
import axios from "axios";
import { UserContext } from "../../../utils/UserContext";

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authors, setAuthors] = useState([]);
  const [dateReleased, setDateReleased] = useState('');
  const [image, setImage] = useState('');
  const [publisher, setPublisher] = useState('');
  const [summary, setSummary] = useState('');
  const [isbn, setISBN] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}` +
        "/bookgenre",
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
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in fetching Genres: " + error,
        );
        setOpenSnackbar(true);
      });
  }, []);

  const saveBook = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    authors.forEach((author) => formData.append("authors[]", author.name));
    formData.append("dateReleased", dateReleased);
    formData.append("image", image);
    formData.append("publisher", publisher);
    formData.append("isbn", isbn);
    formData.append("summary", summary);
    formData.append("genre", selectedGenre);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/addBook`,
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
        setSnackbarSeverity('success');
        setSnackbarMessage(
          'Book Added!',
        );
        setOpenSnackbar(true);
        setTitle('');
        setDescription('');
        setAuthors([]);
        setDateReleased('');
        setImage('');
        setPublisher('');
        setSummary('');
        setISBN('');
        setSelectedGenre('');
        setPreviewImage('');
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in adding Book: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveBook();
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

  const handleAuthorChange = (event) => {
    const newAuthors = event.target.value.split(",").map((author) => ({
      name: author,
    }));
    setAuthors(newAuthors);
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>

            <Grid item>
              <Typography variant="h3" align="center" gutterBottom>
                Add A Book
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
                  label="Description"
                  variant="outlined"
                  multiline
                  required
                  rows={4}
                  fullWidth
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Authors"
                  variant="outlined"
                  fullWidth
                  required
                  value={authors.map((author) => author.name)}
                  onChange={handleAuthorChange}
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
                <InputLabel sx={{ marginTop: 2 }}>Upload Book Cover Image</InputLabel>
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
                <TextField
                  label="Publisher"
                  variant="outlined"
                  fullWidth
                  value={publisher}
                  onChange={(event) => setPublisher(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="Summary"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <TextField
                  label="ISBN"
                  variant="outlined"
                  fullWidth
                  value={isbn}
                  onChange={(event) => setISBN(event.target.value)}
                />
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <InputLabel id="genre-label">Select applicable Genre</InputLabel>
                {genres.map((genre) => (
                  <div key={genre._id}>
                    <input type="radio" id={genre._id} value={genre.genre} onChange={() => (event) => setSelectedGenre(event.target.value)} />
                    <label htmlFor={genre._id}>{genre.genre}</label>
                  </div>
                ))}
              </Grid>

              <Grid item sx={{ margin: 2 }}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Book
                </Button>
              </Grid>

            </form>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddBook;