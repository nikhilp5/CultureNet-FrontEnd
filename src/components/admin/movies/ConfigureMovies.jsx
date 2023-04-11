//Author - Rishi Vasa (B00902815)

import React, { useState } from 'react';
import { Grid, Card, Typography, CardContent, ThemeProvider, CssBaseline, Container, CardMedia } from '@mui/material';
import { appTheme } from '../../../themes/theme';
import { useNavigate } from 'react-router';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import TheatersIcon from '@mui/icons-material/Theaters';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

const ConfigureMovies = () => {

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md">

                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
                    <Grid item xs={12}>
                        <Typography variant="h2" color="primary">
                            Configure Movies
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="primary">
                            You can browse all movies, add new movies, update existing movies, or delete movies from here.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/Movies')}>
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pt: 8}}>
                                <TheatersIcon sx={{ fontSize: '10rem' }} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Browse All Movies
                                </Typography>
                                <Typography color="textSecondary">
                                    Browse CultureNet's Movie Collection
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/AddMovie')}>
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pt: 8}}>
                                <AddToPhotosOutlinedIcon sx={{ fontSize: '10rem' }} />
                                </CardMedia>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Add New Movie
                                </Typography>
                                <Typography color="textSecondary">
                                    Add a new Movie to CultureNet's collection
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/UpdateMovie')}>
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pt: 8}}>
                                <SettingsSuggestOutlinedIcon sx={{ fontSize: '10rem' }} />
                                </CardMedia>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Edit / Delete Movie
                                </Typography>
                                <Typography color="textSecondary">
                                    Update or Delete an existing Movie
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
};

export default ConfigureMovies;