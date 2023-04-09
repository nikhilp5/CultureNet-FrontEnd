//Author - Rishi Vasa (B00902815)

import React from 'react';
import { TextField, Button, Grid, Card, Typography, CardContent, ThemeProvider, CssBaseline, Container, CardMedia } from '@mui/material';
import { appTheme } from '../../../themes/theme';
import { useNavigate } from 'react-router';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
const ConfigureMusic = () => {

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
                            Configure Music
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="primary">
                            You can browse all music, add new music, update existing music, or delete music from here.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/Music')}>
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pt: 8}}>
                                <MusicNoteIcon sx={{ fontSize: '10rem' }} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Browse All Music
                                </Typography>
                                <Typography color="textSecondary">
                                    Browse CultureNet's Music Collection
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/AddMusic')}>
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
                                    Add New Music
                                </Typography>
                                <Typography color="textSecondary">
                                    Add new Music to CultureNet's collection
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => handleCardClick('/UpdateMusic')}>
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
                                    Edit / Delete Music
                                </Typography>
                                <Typography color="textSecondary">
                                    Update or Delete some existing Music
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
};

export default ConfigureMusic;