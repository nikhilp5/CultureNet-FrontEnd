import { Container, CssBaseline, Grid, Pagination, ThemeProvider } from '@mui/material';
import { appTheme } from '../../themes/theme';

import BooksCard from './BooksCard';

const bookData = require("../../data/db.json");
const items = bookData.books;

console.log(items);

export default function BookCards() {

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md" my={5}>
            
                <Grid container spacing={4}>
                    
                    {items.map((book) => (

                        <Grid item key={book} md={4}>
                            
                            <BooksCard book={book} />
                        
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