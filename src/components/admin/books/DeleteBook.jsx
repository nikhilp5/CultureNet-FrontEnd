//Author - Rishi Vasa (B00902815)

import React from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const DeleteBook = ({ bookID, open, onClose }) => {

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
        alert("Book Deleted!");
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        alert("Error in deleting Book: " + error);
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