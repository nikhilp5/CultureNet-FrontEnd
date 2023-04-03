import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, CardHeader, Avatar, Chip, Button, Box, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const userId ="6424fbfd655f8005ee60191e";
  const [genres, setGenres] = useState([]);
  const id = location?.state?.id;
 

  useEffect(() => {
    fetch(`http://localhost:4000/.netlify/functions/api/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);

      if (data.genre) {
        fetch(`http://localhost:4000/.netlify/functions/api/movie_genres/${data.genre.join(',')}`)
          .then(response => response.json())
          .then(data => setGenres(data))
          .catch(error => console.log(error));
      }
    })
    .catch((error) => console.log(error));
      
  }, [id]);

  



  useEffect(() => {
    if (userId) {
      
      fetch(`http://localhost:4000/.netlify/functions/api/movie_ratings/${userId}/${id}`)
        .then((response) => response.json())
        .then((data) => setUserRating(data.rating));
      
    }
  }, [userId, id]);
  
 
  const handleRatingChange = (event, value, movieId) => {
    // const userId = sessionStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:4000/.netlify/functions/api/movie_ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, movieId, rating: value })
      })
        .then((response) => response.json())
        .then((data) => console.log(`User rated movie ${movieId} with a ${value}-star rating`));
    } else {
      console.log('User is not logged in');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }
  const { description,title, image, dateReleased, rating, genre, director} = movie;
  const releaseDate = new Date(dateReleased);
const formattedDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="movie">
            {title.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={`Release Date: ${formattedDate}`}
      
      />
      <CardMedia className={classes.media} image={image} title={title} style={{ width: '100%', objectFit: 'cover' }} />
      <CardContent>

        <Typography variant="body2" color="textSecondary" component="p">
        Genres: {genres.map(genre => genre.name).join(', ')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Director:</b> {director}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Overview:</b> {description}
        </Typography>
        <Box sx={{ marginTop: "auto" }}>
                      <Rating
                        name={`rating-${movie._id}`}
                        value={userRating}
                        precision={0.5}
                        max={5}
                        onChange={(event, value) => handleRatingChange(event, value, movie._id)}
                      />
                    </Box>
      </CardContent>
    </Card>
  );
}

export default MovieDetails;

