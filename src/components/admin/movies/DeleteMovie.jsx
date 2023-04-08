//Author - Rishi Vasa (B00902815)

import React, { useState } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const DeleteMovie = () => {

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    axios
    .delete(
      `${process.env.REACT_APP_BASE_URL}/deleteMovie/`,
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
      setOpen(false);
    })
    .catch((error) => {
      alert("Error in deleting Movie: " + error);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container sx={{ margin: 5 }}>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>Delete Movie</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete the movie?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DeleteMovie;