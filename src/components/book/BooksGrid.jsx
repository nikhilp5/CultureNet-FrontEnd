import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  CssBaseline, Grid,
  Pagination,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { appTheme } from '../../themes/theme';

import { useNavigate } from "react-router";
import BooksCard from './BooksCard';
import { UserContext } from "../../utils/UserContext";

const bookData = require("../../data/db.json");
const items = bookData.books;


export default function BookCards() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);

  const navigate = useNavigate();
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const totalPages = Math.ceil(books.length / booksPerPage);


  useEffect(() => {
    setLoading(true);
    const fetchBooks = async () => {
      try {
        if (!localStorage.getItem("token")) { navigate("/"); };

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}` + "/books"
          , {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setBooksPerPage(1);
    } else {
      setBooksPerPage(9);
    }
  }, [isSmallScreen]);


  const handleBookClick = (id) => {
    navigate("/bookdetail", { state: { id } });
    console.log(id);
  };

  return (

    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="md" my={5} style={{ marginTop: '20px' }}>

        <Grid container spacing={4}>

          {books.slice(startIndex, endIndex).map((book) => (

            <Grid item key={book} md={4}>

              <BooksCard
                book={book}
                onBookClick={handleBookClick}
              />

            </Grid>
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

      </Container>
    </ThemeProvider >
  );
}