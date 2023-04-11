//Author - Rishi Vasa (B00902815)

import React, { useContext } from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../../utils/UserContext";

const DeleteBook = ({ bookID, open, onClose }) => {

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
  useContext(UserContext);

  const handleDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/deleteBook/` + bookID,
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
          'Book Deleted!',
        );
        setOpenSnackbar(true);
        onClose();
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          "Error in Deleting Book: " + error,
        );
        setOpenSnackbar(true);
      });
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this book?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleDelete}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBook;