//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography, List, ListItem, IconButton, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from "buffer";
import axios from 'axios';

const UpdateMovie = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMovie, setEditingMovie] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    description: '',
    releaseDate: '',
    image: '',
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
        console.log("Error in Fetching Movies: " + error);
        alert("Error in Fetching Movies: " + error);
      }
    };
    fetchMovies();
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
      releaseDate: new Date(selectedMovie.dateReleased).toISOString().substr(0, 10),
      image: selectedMovie.image,
      genres: selectedMovie.genres
    };

    // Set the editingMovie state to the selected movie's ID and open the edit movie form dialog
    setEditingMovie(id);
    setFormData(initialFormData);
    setOpenForm(true);
  };

  const handleDeleteClick = (id) => {
    axios
    .delete(
      `${process.env.REACT_APP_BASE_URL}/deleteMovie/`+id,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      alert("Movie Deleted!");
    })
    .catch((error) => {
      alert("Error in deleting Movie: " + error);
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFormClose = () => {
    setOpenForm(false);
    setFormData({
      title: '',
      director: '',
      description: '',
      releaseDate: '',
      image: '',
      genres: []
    });
    setEditingMovie(null);
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
      <EditMovieForm open={openForm} onClose={handleFormClose} formData={formData} setFormData={setFormData} />
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
            <IconButton onClick={() => onDeleteClick(movie._id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const EditMovieForm = ({ open, onClose, formData, setFormData }) => {

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    let imageSrc = '';
    if (formData.image) {
      if (formData.image.type === "Buffer") {
        imageSrc = `data:image/jpeg;base64,${Buffer.from(formData.image).toString('base64')}`;
      } else {
        imageSrc = formData.image;
      }
    } else {
      formData = '';
    }
    setPreviewImage(imageSrc);
  }, [formData.image]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, image: file }));
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
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
        `${process.env.REACT_APP_BASE_URL}/updateMovie/`+formData._id,
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
        alert("Movie Updated!");
      })
      .catch((error) => {
        alert("Error in updating Movie: " + error);
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
              <InputLabel>Release Date</InputLabel>
              <Input
                type="date"
                fullWidth
                value={formData.releaseDate}
                onChange={handleInputChange}
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