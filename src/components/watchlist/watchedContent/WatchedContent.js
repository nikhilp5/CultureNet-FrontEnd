//Author-Nikhil Panikkassery (B00934514)

import {
  Backdrop,
  Button,
  CircularProgress,
  createTheme,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import SearchedBooks from '../../searchpage/searchedBooks/SearchedBooks';
import SearchedMovies from '../../searchpage/searchedMovies/SearchedMovies';
import { useNavigate } from 'react-router';
import { UserContext } from '../../../utils/UserContext';
import SearchedMusic from '../../searchpage/SearchedMusic/SearchedMusic';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const WatchedContent = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [musicResults, setMusicResults] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
    useContext(UserContext);

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
          '/getWatched/',
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
        setMusicResults(res.data.result.music);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity('error');
        setSnackbarMessage(
          'Something went wrong! Please refresh to try again...',
        );
        setOpenSnackbar(true);
        handleClose();
      });
  }, [buttonClick]);

  const navigate = useNavigate();

  const handleOnClickWatchlist = useCallback(
    () => navigate('/Watchlist', { replace: true }),
    [navigate],
  );

  const handleOnClickWatched = useCallback(
    () => navigate('/Watched', { replace: true }),
    [navigate],
  );

  return (
    <div>
      <div className='togglebutton'>
        <Button
          variant='contained'
          style={{ top: '10px', marginLeft: '10px', fontWeight: 'bold' }}
          onClick={handleOnClickWatchlist}
        >
          My WatchList
        </Button>
        <Button
          variant='contained'
          style={{ top: '10px', marginLeft: '10px', fontWeight: 'bold' }}
          onClick={handleOnClickWatched}
        >
          Watched
        </Button>
      </div>

      <ThemeProvider theme={theme}>
        <Typography
          variant='h4'
          style={{ fontWeight: '600', marginRight: '100px' }}
          mt={2}
          ml={10}
          mb={2}
          align='center'
        >
          Watched
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
        <SearchedMusic
          musicResults={musicResults}
          buttonClick={buttonClick}
          setButtonClick={setButtonClick}
        ></SearchedMusic>
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

export default WatchedContent;
