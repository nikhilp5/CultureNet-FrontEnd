import { AppBar, Button, Container, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { appTheme } from '../../themes/theme';

export default function UserDashboard(props) {

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

            {props.id === "movies" ? <Button id="movies" variant={props.variant} href="/UserMovies" >MY MOVIES</Button> : <Button id="movies" variant="text" href="/UserMovies" >MY MOVIES</Button>}

            {props.id === "music" ? <Button id="music" variant={props.variant} href="/UserMusic" >MY MUSIC</Button> : <Button id="music" variant="text" href="/UserMusic" >MY MUSIC</Button>}

            {props.id === "books" ? <Button id="books" variant={props.variant} href="/UserBooks" >MY BOOKS</Button> : <Button id="books" variant="text" href="/UserBooks" >MY BOOKS</Button>}

            {props.id === "watchlist" ? <Button id="watchlist" variant={props.variant} href="/Watchlist" >WATCHLIST</Button> : <Button id="watchlist" variant="text" href="/Watchlist" >WATCHLIST</Button>}

            {props.id === "activity" ? <Button id="activity" variant={props.variant} href="" >ACTIVITY</Button> : <Button id="activity" variant="text" href="" >ACTIVITY</Button>}

            {props.id === "network" ? <Button id="network" variant={props.variant} href="" >NETWORK</Button> : <Button id="network" variant="text" href="" >NETWORK</Button>}

          </Toolbar>
        </AppBar>
        {/* End SECONDARY NAV BAR */}

      </Container>
    </ThemeProvider >
  );
}