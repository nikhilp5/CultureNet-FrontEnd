//Author - Rishi Vasa (B00902815)

import { Container, CssBaseline, Grid, TextField, ThemeProvider } from '@mui/material';
import { appTheme } from '../../themes/theme';
import UserDashboard from './UserDashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FollowButton from './FollowButton';


export default function UserNetwork() {
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [searchTermFollowers, setSearchTermFollowers] = useState('');
    const [searchTermFollowing, setSearchTermFollowing] = useState('');

    useEffect(() => {
        // Fetch followers and set state
        axios.get(`${process.env.REACT_APP_BASE_URL}` +
            "/user/followers",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then(res => setFollowers(res.data.followers))
            .catch(err => console.error(err));

        // Fetch following and set state
        axios.get(`${process.env.REACT_APP_BASE_URL}` +
            "/user/following",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then(res => setFollowing(res.data.following))
            .catch(err => console.error(err));
    }, []);

    const filteredFollowing = following && Array.isArray(following) ? following.filter(following => following.firstName.toLowerCase().includes(searchTermFollowing.toLowerCase())) : [];
    const filteredFollowers = followers && Array.isArray(followers) ? followers.filter(follower => follower.firstName.toLowerCase().includes(searchTermFollowers.toLowerCase())) : [];

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="md">
                <UserDashboard id="network" variant="contained" />

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search Followers"
                            value={searchTermFollowers}
                            onChange={e => setSearchTermFollowers(e.target.value)}
                        />
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ my: '1rem' }}>
                            {filteredFollowers.map(follower => (
                                <Grid container key={follower._id} alignItems="center" spacing={2} sx={{mx: 6, my: 1}}>
                                    <Grid item xs={3}>
                                        {follower.firstName ? follower.firstName : "User"}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FollowButton displayedUserId={follower._id} />
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Search Following"
                            value={searchTermFollowing}
                            onChange={e => setSearchTermFollowing(e.target.value)}
                        />
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4} sx={{ my: '1rem' }}>
                            {filteredFollowing.map(following => (
                                <Grid container key={following._id} alignItems="center" spacing={2} sx={{mx: 6, my: 1}}>
                                    <Grid item xs={3} >
                                        {following.firstName ? following.firstName : "User"}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FollowButton displayedUserId={following._id} />
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider >
    );
}