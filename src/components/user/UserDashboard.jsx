import { AppBar, Button, Container, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { appTheme } from '../../themes/theme';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from '../../utils/UserContext';

export default function UserDashboard(props) {
  const { auth, setAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const navigator = (page) => {
    navigate("/" + page);
  };

  useEffect(() => {
    if (!auth) {
      navigate("/Login");
    }
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="md">

        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">
              Welcome, User
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="primary">
              This text is your profile Bio that other user's can read and connect with you over.
              Lorem ipsum dolor sit amet, consecr adipiscing elit. Maecenas tincidunt suscipit velit sed scelerisque.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt suscipit velit sed scelerisque.
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ my: '1rem' }}>
          <Grid item xs={6} textAlign="center">
            Followers
            <Grid item xs={12} textAlign="center">
              20
            </Grid>
          </Grid>
          <Grid item xs={6} textAlign="center">
            Following
            <Grid item xs={12} textAlign="center">
              330
            </Grid>
          </Grid>
        </Grid>

        {/* SECONDARY NAV BAR */}
        <AppBar style={{ display: 'flex' }} position="static" color="default" elevation={0} sx={{ mb: '2rem' }}>
          <Toolbar style={{ justifyContent: 'space-around', display: 'flex' }} disableGutters >

            {props.id === "movies" ? <Button id="movies" variant={props.variant} onClick={() => navigator("MyMovies")} >MY MOVIES</Button> : <Button id="movies" variant="text" onClick={() => navigator("MyMovies")} >MY MOVIES</Button>}

            {props.id === "music" ? <Button id="music" variant={props.variant} onClick={() => navigator("MyMusic")} >MY MUSIC</Button> : <Button id="music" variant="text" onClick={() => navigator("MyMusic")}>MY MUSIC</Button>}

            {props.id === "books" ? <Button id="books" variant={props.variant} onClick={() => navigator("MyBooks")} >MY BOOKS</Button> : <Button id="books" variant="text" onClick={() => navigator("MyBooks")} >MY BOOKS</Button>}

            {props.id === "watchlist" ? <Button id="watchlist" variant={props.variant} onClick={() => navigator("Watchlist")} >WATCHLIST</Button> : <Button id="watchlist" variant="text" onClick={() => navigator("Watchlist")}>WATCHLIST</Button>}

            {props.id === "activity" ? <Button id="activity" variant={props.variant} onClick={() => navigator("Activity")}>ACTIVITY</Button> : <Button id="activity" variant="text" onClick={() => navigator("Activity")}>ACTIVITY</Button>}

            {props.id === "network" ? <Button id="network" variant={props.variant} onClick={() => navigator("Network")} >NETWORK</Button> : <Button id="network" variant="text" onClick={() => navigator("Network")} >NETWORK</Button>}

          </Toolbar>
        </AppBar>
        {/* End SECONDARY NAV BAR */}

      </Container>
    </ThemeProvider >
  );
}