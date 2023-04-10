import { Card, CardContent, Container, CssBaseline, Grid, Rating, TextField, ThemeProvider, Typography } from '@mui/material';
import { appTheme } from '../../themes/theme';
import UserDashboard from './UserDashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';


export default function UserReviews() {

    const location = useLocation();
    const id = location?.state?.id;

    const navigate = useNavigate();

    const navigator = (page) => {
        navigate("/" + page);
    };

    const [reviews, setReviews] = useState(null);

    const fetchAllReviews = () => {
        const endpoint = "/user_reviews" + (id ? "/" + id : "");
        axios.get(`${process.env.REACT_APP_BASE_URL}` +
            endpoint,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then((response) => response.data)
            .then((data) => {
                if (data) {
                    setReviews(data);
                }
                else {
                    setReviews(['No Reviews Yet']);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/Login");
        }
        fetchAllReviews();
    }, []);


    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <UserDashboard id="reviews" variant="contained" />

                <Grid container spacing={4} sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                    {reviews && reviews.map((review) => (
                        <Grid item key={review._id} xs={12} sm={6} md={4} textAlign="center">
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h6" component="h3" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {review.contentId}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        {review.category}
                                    </Typography>
                                    <Rating
                                        value={review.rating || 0}
                                        precision={0.5}
                                        max={5}
                                        readOnly
                                    />
                                    <Typography variant="body1" component="p">
                                        {review.comment}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                        {review.userName} - {review.createdTS.slice(0, 10)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider >
    );
}