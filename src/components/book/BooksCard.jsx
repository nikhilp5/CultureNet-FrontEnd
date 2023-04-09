import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';


const BooksCard = ({ book, onBookClick }) => {
  return (
    <div className="content-card">

        <Card onClick={ () => onBookClick(book._id) }>

            <CardMedia
                component="img"
                sx={{ width: '100%', height: 400 }}
                image={book.image_url}
                alt={book.title}
            />

            <CardContent>

                <Typography variant="h6" component="h2" noWrap>
                    {book.title}
                </Typography>
                
                <Typography variant="subtitle1" component="h2">
                    By {book.authors}
                </Typography>
                
                <Typography variant="subtitle1" component="h2">
                    {book.genre}
                </Typography>
            
            </CardContent>

            <CardActions style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Rating name="read-only" value={3} max={5} precision={0.5} readOnly />
            </CardActions>


        </Card>
    </div>
  );
};

export default BooksCard;
