import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Pagination,
  CircularProgress,
  useMediaQuery

} from "@mui/material";

import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
const ListOfMovies = () => {
  const [movies, setMovies] = useState([]);
  const [movieRatings, setMovieRatings] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  // const moviesPerPage = 9;
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  console.log(isSmallScreen);
  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        if (!localStorage.getItem("token")) { navigate("/"); }
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}` + "/movies"
          , {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
        const data = await response.json();
        
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovieRatings = async () => {
      const movieIds = movies.map((movie) => movie._id);
      const movieRatings = {};
      for (const id of movieIds) {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}` + `/movie_ratings/${id}/ratings`);
        
        const data = await response.json();
        movieRatings[id] = data.rating;
      }
      setMovieRatings(movieRatings);
    };
    fetchMovieRatings();
  }, [movies]);
  



  const handleMovieClick = (id) => {
    navigate("/moviedetail", { state: { id } });
    console.log(id);
  };
  useEffect(() => {
    if (isSmallScreen) {
      setMoviesPerPage(1);
    } else {
      setMoviesPerPage(9);
    }
  }, [isSmallScreen]);




  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>

      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Grid container spacing={4}>
            {movies.slice(startIndex, endIndex).map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={handleMovieClick}
                movieRatings={movieRatings}
              />
            ))}
          </Grid>
          {!isSmallScreen && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
            />
          )}
          {isSmallScreen && (
            <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
              />
            </Grid>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default ListOfMovies;
