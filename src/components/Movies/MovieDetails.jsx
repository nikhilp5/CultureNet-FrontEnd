//Author - Pranay Raycha (B00932030)
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, CardHeader, Avatar, Chip, Button, Box, Rating } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContentControl from '../watchlist/contentControl/contentControl';
import { Buffer } from "buffer";

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
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  console.log(userId);
  const [genres, setGenres] = useState([]);
  const id = location?.state?.id;
  const email = JSON.parse(localStorage.getItem('user')).email;
  console.log(email);
  // const [email, setEmail]=useState("");
  const [buttonClick, setButtonClick] = useState(false);
  useEffect(() => {

    if (!localStorage.getItem("token")) { navigate("/"); }
    fetch(`${process.env.REACT_APP_BASE_URL}` + `/movies/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!localStorage.getItem("token")) { navigate("/"); }
    fetch(`${process.env.REACT_APP_BASE_URL}` + `/movies/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })



      .then((response) => response.json())
      .then((data) => {
        setMovie(data);

        if (data.genre) {
          fetch(`${process.env.REACT_APP_BASE_URL}` + `/movie_genres/${data.genre.join(',')}`)
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(error => console.log(error));
        }
      })
      .catch((error) => console.log(error));

  }, [id, buttonClick]);





  useEffect(() => {
    if (userId) {
      console.log(userId);
      fetch(`${process.env.REACT_APP_BASE_URL}` + `/movie_ratings/${userId}/${id}`)
        .then((response) => response.json())
        .then((data) => setUserRating(data.rating));

    }
  }, [userId, id]);


  const handleRatingChange = (event, value, movieId) => {
    // const userId = sessionStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      fetch(`${process.env.REACT_APP_BASE_URL}` + `/movie_ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, movieId, rating: value })
      })
        .then((response) => response.json())
        .then((data) => { setUserRating(data.rating); });
    } else {
      console.log('User is not logged in');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }
  const { description, title, dateReleased, rating, genre, director } = movie;

  let imageSrc = '';
  if (movie.image) {
    if (movie.image.type === "Buffer") {
      imageSrc = `data:image/jpeg;base64,${Buffer.from(movie.image).toString('base64')}`;
    } else {
      imageSrc = movie.image;
    }
  } else {
    imageSrc = '';
  }

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
      <CardMedia className={classes.media} image={imageSrc} title={title} style={{ width: '100%', objectFit: 'cover' }} />
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
      <div style={{ position: 'relative', float: 'right', bottom: '20px', right: "20px" }}>
        <ContentControl
          type="movies" content={movie} buttonClick={buttonClick}
          setButtonClick={setButtonClick}
        />
      </div>
    </Card>
  );
}

export default MovieDetails;

