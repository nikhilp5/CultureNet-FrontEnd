//Author - Rishi Vasa (B00902815)

import React, { useState } from 'react';
import { TextField, Button, Grid, Card, InputLabel, Input, Typography, CardContent, ThemeProvider, CssBaseline, Container, CardMedia } from '@mui/material';
import { appTheme } from '../../themes/theme';
import { useNavigate } from 'react-router';

const AdminDashboard = () => {

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
              Welcome, Admin
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="primary">
              You can configure all type's of content present on CultureNet from here.
            </Typography>
          </Grid>
        </Grid>
        
        <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handleCardClick('/ConfigureMovies')}>
              <CardMedia
                component="img"
                sx={{ pt: 8 }}
                image="/images/Movies.jpg"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Configure Movies
                </Typography>
                <Typography color="textSecondary">
                  Configure CultureNet's Movie Collection here
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handleCardClick('/ConfigureBooks')}>
              <CardMedia
                component="img"
                sx={{ pt: 8 }}
                image="/images/Books.jpg"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Configure Books
                </Typography>
                <Typography color="textSecondary">
                  Configure CultureNet's Book Collection here
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', cursor: 'pointer' }}
              onClick={() => handleCardClick('/ConfigureMusic')}>
              <CardMedia
                component="img"
                sx={{ pt: 8 }}
                image="/images/Music.jpg"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Configure Music
                </Typography>
                <Typography color="textSecondary">
                  Configure CultureNet's Music Collection here
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider >
  );
};

export default AdminDashboard;