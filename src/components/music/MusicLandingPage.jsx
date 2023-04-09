import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";

const MusicLandingPage = () => {

  const [musicList, setMusicList] = useState([]);
  const [musicRatings, setMovieRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  const fetchMusic = async () => {

    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}` + `/music`, {
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
      if (response.status == 200) {
        console.log(response.data);
        setMusicList(response.data.music);
      }
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/SessionTimeOut");
      }
      setSnackbarSeverity("error");
      setSnackbarMessage('Something went wrong! Please refresh to try again...');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/Login");
    }
    setLoading(false);
    fetchMusic();
  }, []);

  const navigateToDetailsPage = (music_id) => {
    navigate("/musicdetails/" + music_id);
  };

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <Grid container spacing={4}>
            {musicList.map((music, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  onClick={() => navigateToDetailsPage(music._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 300, objectFit: "cover" }}
                    image={music.image}
                    alt={music.title}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2" noWrap>
                      {music.title}
                    </Typography>
                    <Typography>
                      Release Date: {new Date(music.dateReleased).getFullYear()}
                    </Typography>
                    <Rating
                      name={`rating-${music._id}`}
                      value={musicRatings[music._id] || 0}
                      precision={0.5}
                      max={5}
                      readOnly
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </Container>
  );
};

export default MusicLandingPage;
