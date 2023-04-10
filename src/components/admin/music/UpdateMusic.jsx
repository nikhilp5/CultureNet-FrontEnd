//Author - Rishi Vasa (B00902815)

import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Typography, List, ListItem, IconButton, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from "buffer";
import axios from 'axios';
import DeleteMusic from './DeleteMusic';
import { UserContext } from "../../../utils/UserContext";

const UpdateMusic = () => {

  const [musics, setMusics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingMusicId, setDeletingMusicId] = useState(null);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    title: '',
    artists: [],
    dateReleased: '',
    album: ''
  });

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}` + "/music"
          , {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
        const data = await response.json();
        setMusics(data.music);
      } catch (error) {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Fetching Song: " + error,
        );
        setOpenSnackbar(true);
      }
    };
    fetchMusic();
  }, []);


  const handleEditClick = (id) => {
    // Find the selected music from the musics array
    const selectedMusic = musics.find(music => music._id === id);

    // Populate the form with the music data
    const initialFormData = {
      _id: selectedMusic._id,
      title: selectedMusic.title,
      album: selectedMusic.album,
      artists: selectedMusic.artists,
      dateReleased: new Date(selectedMusic.dateReleased).toISOString().substr(0, 10),
    };
    setFormData(initialFormData);
    setOpenEditForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingMusicId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeletingMusicId(null);
    setOpenDeleteModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFormClose = () => {
    setOpenEditForm(false);
    setFormData({
      title: '',
      artists: [],
      dateReleased: '',
      album: ''
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
                Select A Song to Update
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Search Music"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Grid>

            <Grid item>
              <ConfigurableListOfMusic musics={musics} searchTerm={searchTerm} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {openDeleteModal && (
        <DeleteMusic musicID={deletingMusicId} open={openDeleteModal} onClose={handleDeleteModalClose} />
      )}
      <EditMusicForm open={openEditForm} onClose={handleFormClose} formData={formData} setFormData={setFormData} />
    </Grid>
  );
};


const ConfigurableListOfMusic = ({ musics, searchTerm, onEditClick, onDeleteClick }) => {
  let filteredMusic = []
  if (musics && musics.length > 0) {
    filteredMusic = musics.filter((music) => music.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return (
    <List sx={{ padding: 0 }}>
      {filteredMusic.map((music) => (
        <ListItem key={music._id} sx={{ paddingLeft: 0 }}>
          <ListItemText primary={<Typography noWrap>{music.title}</Typography>} secondary={music.dateReleased} />
          <ListItemSecondaryAction sx={{ marginRight: 0 }}>
            <IconButton onClick={() => onEditClick(music._id)} edge="end" aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDeleteClick(music._id)}
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

const EditMusicForm = ({ open, onClose, formData, setFormData }) => {

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
    useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleArtistsChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      artists: event.target.value.split(', '),
    }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    update();
    onClose();
  };

  const update = () => {

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/updateMusic/` + formData._id,
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
          'Song Updated!',
        );
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Updating Song: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>Edit Music</DialogTitle>
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
                label="Artists"
                name="artists"
                fullWidth
                required
                value={formData.artists.join(', ')}
                onChange={handleArtistsChange}
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

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                fullWidth
                required
                label="Album"
                name="album"
                value={formData.album}
                onChange={handleInputChange}
              />
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
  UpdateMusic,
  ConfigurableListOfMusic,
  EditMusicForm,
}