import {
  Backdrop,
  CircularProgress,
  createTheme,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchedBooks from "../../searchpage/searchedBooks/SearchedBooks";
import SearchedMovies from "../../searchpage/searchedMovies/SearchedMovies";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const WatchListContent = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

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
          "/getWatchlist/" +
          localStorage.getItem("id"),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setMovieResults(res.data.result.movies);
        setBookResults(res.data.result.books);
        handleClose();
      })
      .catch((error) => {
        alert("Error- " + error);
        handleClose();
      });
  }, [buttonClick]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h4"
          style={{ fontWeight: "600" }}
          mt={2}
          ml={10}
          mb={2}
        >
          My WatchList
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
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </div>
  );
};

export default WatchListContent;
