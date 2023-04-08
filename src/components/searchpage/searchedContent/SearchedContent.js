//Author-Nikhil Panikkassery (B00934514)

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
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchedBooks from "../searchedBooks/SearchedBooks";
import SearchedMovies from "../searchedMovies/SearchedMovies";
import SearchedUsers from "../searchedUsers/SearchedUsers";
import { UserContext } from "../../../utils/UserContext";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const SearchedContent = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
    useContext(UserContext);

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
          "/search/" +
          searchTerm +
          "/" +
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
        setUserResults(res.data.result.users);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Something went wrong! Please refresh to try again..."
        );
        setOpenSnackbar(true);
        handleClose();
      });
  }, [searchTerm, buttonClick]);

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
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </div>
  );
};

export default SearchedContent;
