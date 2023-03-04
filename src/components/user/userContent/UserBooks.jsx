import { Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Pagination, Rating, ThemeProvider, Typography } from '@mui/material';
import { appTheme } from '../../../themes/theme';
import UserDashboard from '../UserDashboard';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const userMovieCount = 10;

export default function UserBooks() {

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md">

                <UserDashboard id="books" variant="contained" />

                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    sx={{ pt: 8 }}
                                    image="/Books.jpg"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        Book Title #{card}
                                    </Typography>
                                    <Typography>
                                        This is a random description of the corresponding book {card}. Lorem ipsum Lorem ipsum.
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ flex: 1, justifyContent: 'space-evenly' }}>
                                    <Button size="small">View Your Review</Button>
                                    <Rating name="read-only" value={Math.random() * 5} max={5} readOnly />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
                    <Grid item xs={12}>
                        <Pagination count={Math.ceil(userMovieCount / 3)} style={{ flex: 1, justifyContent: 'center' }} sx={{ my: 3 }} showFirstButton showLastButton />
                    </Grid>
                </Grid>

            </Container>
        </ThemeProvider >
    );
}