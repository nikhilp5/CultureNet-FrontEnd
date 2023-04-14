import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { Rating } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  review: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    width: '100%'
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  editButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const UserReview = ({ review, onEdit }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const [reviewId, setReviewId] = useState(review._id);

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    setContent(content);
    setRating(rating);
    onEdit(content, rating, reviewId);
    setIsOpen(false);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
    <Box className={classes.review}>
    <AccountCircleIcon color="primary" fontSize="large" className="my-icon" />
    <div style={{position:'relative',left:'45px',bottom:'30px'}}>    
        <Typography variant="h7" className={classes.title}>
        {review.userName}
        </Typography>
    </div>
    
      
      <Rating value={review.rating} readOnly/>
      <Typography variant="body1" className={classes.content} sx={{ marginTop: 2 }}>
        {review.comment}
      </Typography>

      {review.belongsToUser && (
        <>
          <Button variant="outlined" color="primary" className={classes.editButton} onClick={handleEdit}>
            Edit
          </Button>
          <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please edit your review below:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Review Content"
                fullWidth
                value={content}
                onChange={handleContentChange}
              />
              <Box mt={2}>
                <Typography component="legend">Rating:</Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default UserReview;
