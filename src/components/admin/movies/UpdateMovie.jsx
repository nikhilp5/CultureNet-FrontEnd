//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Typography, List, ListItem, IconButton, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from "buffer";
import axios from 'axios';
import DeleteMovie from './DeleteMovie';
import { UserContext } from "../../../utils/UserContext";

const UpdateMovie = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingMovieId, setDeletingMovieId] = useState(null);
  const [genres, setGenres] = useState([]);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    director: '',
    description: '',
    dateReleased: '',
    genres: []
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}` + "/movies"
          , {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in fetching Movies: " + error,
        );
        setOpenSnackbar(true);
      }
    };
    fetchMovies();
  },[movies] );

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
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in fetching Genres: " + error,
        );
        setOpenSnackbar(true);
      });
  }, []);

  const handleEditClick = (id) => {
    // Find the selected movie from the movies array
    const selectedMovie = movies.find(movie => movie._id === id);

    // Populate the form with the movie data
    const initialFormData = {
      _id: selectedMovie._id,
      title: selectedMovie.title,
      director: selectedMovie.director,
      description: selectedMovie.description,
      dateReleased: new Date(selectedMovie.dateReleased).toISOString().substr(0, 10),
      image: selectedMovie.image,
      genres: selectedMovie.genre
    };
    setFormData(initialFormData);
    setOpenEditForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingMovieId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeletingMovieId(null);
    setOpenDeleteModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFormClose = () => {
    setOpenEditForm(false);
    setFormData({
      title: '',
      director: '',
      description: '',
      dateReleased: '',
      genres: []
    });
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Grid item xs={1} md={4}></Grid>
      <Grid item xs={10} md={4}>
        <Card sx={{ padding: 2 }}>
          <Grid container direction="column" spacing={2}>

            <Grid item>
              <Typography variant="h3" align="center" gutterBottom>
                Select A Movie to Update
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Search Movies"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Grid>

            <Grid item>
              <ConfigurableListOfMovies movies={movies} searchTerm={searchTerm} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {openDeleteModal && (
        <DeleteMovie movieID={deletingMovieId} open={openDeleteModal} onClose={handleDeleteModalClose} />
      )}
      <EditMovieForm open={openEditForm} onClose={handleFormClose} formData={formData} setFormData={setFormData} genres={genres} />
    </Grid>
  );
};


const ConfigurableListOfMovies = ({ movies, searchTerm, onEditClick, onDeleteClick }) => {
  let filteredMovies = []
  if (movies && movies.length > 0) {
    filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return (
    <List sx={{ padding: 0 }}>
      {filteredMovies.map((movie) => (
        <ListItem key={movie._id} sx={{ paddingLeft: 0 }}>
          <ListItemText primary={<Typography noWrap>{movie.title}</Typography>} secondary={movie.dateReleased} />
          <ListItemSecondaryAction sx={{ marginRight: 0 }}>
            <IconButton onClick={() => onEditClick(movie._id)} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDeleteClick(movie._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const EditMovieForm = ({ open, onClose, formData, setFormData, genres }) => {

  const [previewImage, setPreviewImage] = useState(null);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);

  useEffect(() => {
    let imageSrc = null;
    if (formData.image) {
      if (formData.image.type === "Buffer") {
        imageSrc = `data:image/jpeg;base64,${Buffer.from(formData.image).toString('base64')}`;
      } else {
        imageSrc = formData.image;
      }
    }
    setPreviewImage(imageSrc);
  }, [formData.image]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectedGenresChange = (event) => {
    const genreId = event.target.value;
    const isChecked = event.target.checked;
    let updatedGenres = formData.genres || [];

    if (isChecked) {
      // Add genre id to formData
      updatedGenres.push(genreId);
    } else {
      // Remove genre id from formData
      updatedGenres = updatedGenres.filter((id) => id !== genreId);
    }

    setFormData((prevFormData) => ({ ...prevFormData, genres: updatedGenres }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setPreviewImage(null);
    setFormData((prevFormData) => ({ ...prevFormData, image: null }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    update();
    onClose();
  };

  const update = () => {

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/updateMovie/` + formData._id,
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
          'Movie Updated!',
        );
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Updating Movie: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                fullWidth
                required
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Release Date"
                type="date"
                required
                value={formData.dateReleased}
                onChange={(e) => setFormData({ ...formData, dateReleased: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item sx={{ marginTop: 2 }}>
              <InputLabel>Upload Movie Cover Image</InputLabel>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </Grid>

            {previewImage && (
              <Grid item sx={{ marginTop: 2 }}>
                <img src={previewImage} alt="Cover Image" style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }} />
                <Button onClick={handleImageRemove}>Remove Image</Button>
              </Grid>
            )}


            <Grid item sx={{ marginTop: 2 }}>
              <InputLabel id="genre-label">Select applicable Genres</InputLabel>
              {genres.map((genre, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={formData.genres && formData.genres.includes(genre._id)} value={genre._id} onChange={handleSelectedGenresChange} />}
                  label={genre.name}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Update</Button>
            </Grid>
          </Grid>

        </form>
      </DialogContent>
    </Dialog>
  );
};


export {
  UpdateMovie,
  ConfigurableListOfMovies,
  EditMovieForm,
}