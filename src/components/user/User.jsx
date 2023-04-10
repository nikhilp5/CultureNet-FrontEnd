//Author - Rishi Vasa (B00902815)

import { AppBar, Button, Container, CssBaseline, Grid, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { appTheme } from '../../themes/theme';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FollowButton from './FollowButton';

export default function User(props) {

  const location = useLocation();
  const id = location?.state?.id;

  const navigate = useNavigate();

  const navigator = (page, id) => {
    navigate("/" + page, id);
  };

  const defaultProfileForm = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    nsfw: false,
  };

  const [profileForm, setProfileForm] = useState({ ...defaultProfileForm });
  const [followingCount, setFollowingCount] = useState('');
  const [followerCount, setFollowerCount] = useState('');

  const fetchProfile = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}` + `/profile/` + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      if (response && response.status === 200) {
        setProfileForm(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/SessionTimeOut");
      }
    }
  };

  const fetchNetwork = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}` + `/follow-count/` + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .catch((err) => {
        console.error(err);
      });

    try {
      if (response && response.status === 200) {
        setFollowingCount(response.data.followingCount);
        setFollowerCount(response.data.followerCount);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/SessionTimeOut");
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/Login");
    }
    fetchProfile();
    fetchNetwork();
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container maxWidth="md">

        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
          <Grid item xs={12}>
            <Typography variant="h2" color="primary">
              {profileForm.firstName + " " + profileForm.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="primary">
              {profileForm.bio}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ my: '1rem' }}>
          <Grid item xs={6} textAlign="center">
            Followers
            <Grid item xs={12} textAlign="center">
              {followerCount}
            </Grid>
          </Grid>
          <Grid item xs={6} textAlign="center">
            Following
            <Grid item xs={12} textAlign="center">
              {followingCount}
            </Grid>
          </Grid>
        </Grid>


        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ my: '1rem' }}>
          <Grid item xs={6} textAlign="center">
            <FollowButton displayedUserId={id} />
          </Grid>
        </Grid>

        {/* SECONDARY NAV BAR */}
        <AppBar style={{ display: 'flex' }} position="static" color="default" elevation={0} sx={{ mb: '2rem' }}>
          <Toolbar style={{ justifyContent: 'space-around', display: 'flex' }} disableGutters >

            {props.id === "reviews" ? <Button id="reviews" variant={props.variant} onClick={() => navigator("Reviews", { state: { id } })} >REVIEWS</Button> : <Button id="reviews" variant="text" onClick={() => navigator("Reviews", { state: { id } })} >REVIEWS</Button>}

            {props.id === "network" ? <Button id="network" variant={props.variant} onClick={() => navigator("Network")} >NETWORK</Button> : <Button id="network" variant="text" onClick={() => navigator("Network")} >NETWORK</Button>}

          </Toolbar>
        </AppBar>
        {/* End SECONDARY NAV BAR */}

      </Container>
    </ThemeProvider >
  );
}