import {
  createTheme,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../common/Navbar";
import SearchedBooks from "../searchedBooks/SearchedBooks";
import SearchedMovies from "../searchedMovies/SearchedMovies";
import SearchedUsers from "../searchedUsers/SearchedUsers";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const SearchedContent = () => {
  const [movieResults, setMovieResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [userResults, setUserResults] = useState([]);

  const { state } = useLocation();
  const searchTerm = state;

  const obj = {
    movies: [
      {
        id: 1,
        title: "Movie1",
      },
      {
        id: 2,
        title: "Movie2",
      },
    ],
    books: [
      {
        id: 1,
        title: "Book1",
      },
      {
        id: 2,
        title: "Book2",
      },
    ],
    users: [
      {
        id: 1,
        title: "User1",
      },
      {
        id: 2,
        title: "User2",
      },
    ],
  };

  useEffect(() => {
    var movieArray = [];
    var bookArray = [];
    var userArray = [];
    for (var key in obj) {
      var value = obj[key];
      for (var j = 0; j < value.length; j++) {
        if (key === "movies") {
          if (value[j].title!=null && searchTerm!=null && value[j].title.toLowerCase().includes(searchTerm.toLowerCase())) {
            movieArray.push(value[j]);
          }
        }
        if (key === "books") {
          if (value[j].title!=null && searchTerm!=null && value[j].title.toLowerCase().includes(searchTerm.toLowerCase())) {
            bookArray.push(value[j]);
          }
        }
        if (key === "users") {
          if (value[j].title!=null&& searchTerm!=null  && value[j].title.toLowerCase().includes(searchTerm.toLowerCase())) {
            userArray.push(value[j]);
          }
        }
      }
    }
    setMovieResults(movieArray);
    setBookResults(bookArray);
    setUserResults(userArray);
  }, [searchTerm]);

  return (
    <div>
      <Navbar />
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
        <SearchedMovies movieResults={movieResults}></SearchedMovies>
        <SearchedBooks bookResults={bookResults}></SearchedBooks>
        <SearchedUsers userResults={userResults}></SearchedUsers>
      </ThemeProvider>
    </div>
  );
};

export default SearchedContent;
