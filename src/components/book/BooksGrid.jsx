import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Grid, Pagination, ThemeProvider } from '@mui/material';
import { appTheme } from '../../themes/theme';

import { useNavigate } from "react-router";
import BooksCard from './BooksCard';

const bookData = require("../../data/db.json");
const items = bookData.books;


export default function BookCards() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchBooks = async () => {
          try {
            if(!localStorage.getItem("token")) {navigate("/")};

            const response = await fetch(
              `${process.env.REACT_APP_BASE_URL_DEVELOP}`+"/books"
            ,  {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            });
            const data = await response.json();
            console.log(data)
            setBooks(data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        fetchBooks();
    }, []);

    const handleBookClick = (id) => {
      navigate("/bookdetail", { state: { id } });
      console.log(id);
    };

    return (

        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md" my={5} style={{ marginTop: '20px' }}>
            
                <Grid container spacing={4}>
                    
                    {books.map((book) => (

                        <Grid item key={book} md={4}>
                            
                            <BooksCard 
                              book={book}
                              onBookClick={handleBookClick}
                            />
                        
                        </Grid>
                    ))}

                </Grid>

                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
                    <Grid item xs={12}>
                        <Pagination count={Math.ceil(10 / 3)} style={{ flex: 1, justifyContent: 'center' }} sx={{ my: 3 }} showFirstButton showLastButton />
                    </Grid>
                </Grid>

            </Container>
        </ThemeProvider >
    );
}