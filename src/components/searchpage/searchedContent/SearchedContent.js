import {
  Backdrop,
  CircularProgress,
  createTheme,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchedBooks from '../searchedBooks/SearchedBooks';
import SearchedMovies from '../searchedMovies/SearchedMovies';
import SearchedUsers from '../searchedUsers/SearchedUsers';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const SearchedContent = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

  const { state } = useLocation();
  const searchTerm = state;

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    handleOpen();
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}` +
          '/search/' +
          searchTerm +
          '/' +
          JSON.parse(localStorage.getItem('user'))._id,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setMovieResults(res.data.result.movies);
        setBookResults(res.data.result.books);
        setUserResults(res.data.result.users);
        handleClose();
      })
      .catch((error) => {
        alert('Error- ' + error);
        handleClose();
      });
  }, [searchTerm, buttonClick]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography
          variant='h4'
          style={{ fontWeight: '600' }}
          mt={2}
          ml={10}
          mb={2}
        >
          Search results for "{searchTerm}"
        </Typography>
        <Divider />
        <SearchedMovies
          movieResults={movieResults}
          buttonClick={buttonClick}
          setButtonClick={setButtonClick}
        ></SearchedMovies>
        <SearchedBooks
          bookResults={bookResults}
          buttonClick={buttonClick}
          setButtonClick={setButtonClick}
        ></SearchedBooks>
        <SearchedUsers userResults={userResults}></SearchedUsers>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </ThemeProvider>
    </div>
  );
};

export default SearchedContent;
