import * as React from 'react';
import * as Mui from '@mui/material';
import Navbar from '../common/Navbar';
import { appTheme } from '../../themes/theme';
import MoviesImg from './Movies.jpg';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const cards = [1, 2, 3];

export default function UserDashboard() {
  return (
    <Mui.ThemeProvider theme={appTheme}>
      <Mui.CssBaseline />
      <Navbar />
      <Mui.Container maxWidth="xs">

        <Mui.Grid container justifyContent="center" spacing={2}>
          <Mui.Typography variant="h2" mt={4} color="primary">
            Welcome, User
          </Mui.Typography>
          <Mui.Typography variant="h7" mt={2} color="primary">
            This text is your profile Bio that other user's can read and connect with you over.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt suscipit velit sed scelerisque.
          </Mui.Typography>
        </Mui.Grid>

        <Mui.Grid container direction="row" justifyContent="center" alignItems="center" mt={2}>
          <Mui.Grid item mr={20}>
            Followers
            <Mui.Grid item>
              10
            </Mui.Grid>
          </Mui.Grid>

          <Mui.Grid item>
            Following
            <Mui.Grid item>
              20
            </Mui.Grid>
          </Mui.Grid>

        </Mui.Grid>

        {/* SECONDARY NAV BAR */}
        <Mui.AppBar position="static" color="default" elevation={0}>
          <Mui.Toolbar style={{ flex: 1, justifyContent: 'space-evenly' }}>
            <Mui.Button variant="contained" href="">FILMS</Mui.Button>
            <Mui.Button variant="outlined" href="">SHOWS</Mui.Button>
            <Mui.Button variant="outlined" href="">MUSIC</Mui.Button>
            <Mui.Button variant="outlined" href="">BOOKS</Mui.Button>
            <Mui.Button variant="outlined" href="">WATCHLIST</Mui.Button>
            <Mui.Button variant="outlined" href="">ACTIVITY</Mui.Button>
            <Mui.Button variant="outlined" href="">NETWORK</Mui.Button>
          </Mui.Toolbar>
        </Mui.AppBar>
        {/* End SECONDARY NAV BAR */}

        <Mui.Container sx={{ py: 4 }} maxWidth="md">
          <Mui.Grid container spacing={4}>
            {cards.map((card) => (
              <Mui.Grid item key={card} md={4}>
                <Mui.Card>
                  <Mui.CardMedia
                    component="img"
                    sx={{ pt: 8 }}
                    image={MoviesImg}
                  />
                  <Mui.CardContent>
                    <Mui.Typography variant="h5" component="h2">
                      Movie Title #{card}
                    </Mui.Typography>
                    <Mui.Typography>
                      This is a random description of the corresponding movie {card}. Lorem ipsum Lorem ipsum.
                    </Mui.Typography>
                  </Mui.CardContent>
                  <Mui.CardActions style={{ flex: 1, justifyContent: 'space-evenly' }}>
                    <Mui.Button size="small">View Your Review</Mui.Button>
                    <StarIcon></StarIcon>
                    <StarIcon></StarIcon>
                    <StarBorderIcon></StarBorderIcon>
                  </Mui.CardActions>
                </Mui.Card>
              </Mui.Grid>
            ))}
          </Mui.Grid>
        </Mui.Container>


      </Mui.Container>
    </Mui.ThemeProvider >
  );
}