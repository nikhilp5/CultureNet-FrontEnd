import { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MovieCard from './MovieCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  moviePage: {
    padding: theme.spacing(2),
    backgroundColor: '#eaeaea'
  },
  searchNav: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  searchBox: {
    marginLeft: theme.spacing(2),
    '& > form': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  movies: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const Movie = () => {
  const API_URL =
    'https://api.themoviedb.org/3/movie/popular?api_key=b6ed2e93ce4d889b4cc1315d000cb974';
  const API_SEARCH =
    'https://api.themoviedb.org/3/search/movie?api_key=b6ed2e93ce4d889b4cc1315d000cb974&query=';

  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState('');
  const fetchMovies = async () => {
    const { data } = await axios.get(
      API_URL
    );
    setMovies(data.results);
    
  };

  useEffect(() => {
    fetchMovies();
  }, []);
// console.log(movies)
  const classes = useStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(API_SEARCH + term)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  return (
    <Box className={classes.moviePage}>
      <Box className={classes.searchNav}>
        <Typography variant="h4" className={classes.title}>
          Movies
        </Typography>
        {/* <Box className={classes.searchBox}>
          <form onSubmit={handleSearch}>
            <TextField
              variant="outlined"
              size="small"
              label="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </form>
        </Box> */}
      </Box>
      <Grid container spacing={2} className={classes.movies}>
        {movies && movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard {...movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Movie;
