import { useEffect, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Box,
  Rating,
} from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import { useNavigate, useParams } from "react-router-dom";


export default function MusicDetailsPage() {
  const musicDetails = {
    title: '',
    artists: '',
    album: '',
    dateReleased: '',
    image: '',
  };

  const [music, setMusic] = useState({ ...musicDetails });
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(UserContext);

  const navigate = useNavigate();
  const params = useParams();

  const fetchMusicDetails = async (id) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}` + `/music/${id}`, {
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
        setMusic(response.data);
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
    fetchMusicDetails(params.id);
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <Box
          display="flex"
          alignItems="left"
          sx={{ marginTop: 5, marginLeft: 20 }}
        >
          <ArrowBackIosNewRounded
            style={{ fontSize: 32 }}
            onClick={() => {
              navigate("/music");
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Card sx={{ marginLeft: 35, marginRight: 35 }}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                height="100%"
                image={music.image}
                alt="Card Image"
                sx={{ objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={1} sm={1} />
                  <Grid item xs={10} sm={10}>
                    <Grid container direction="column" align="left">
                      <Grid item>
                        <Typography variant="h3" component="h3">
                          {music.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h5">
                          {music.album}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="h6">
                          {music.artists}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body"
                          component="p"
                          marginTop={2.5}
                        >
                          Released: {new Date(music.dateReleased).getFullYear()}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Box display="flex" alignItems="center" marginTop={1}>
                          <Rating
                            name="read-only"
                            precision={0.5}
                            value={4.5}
                            readOnly
                            style={{ fontSize: 14 }}
                          />
                          <Typography
                            variant="body"
                            component="p"
                            marginLeft={1}
                            style={{ marginLeft: 10, fontSize: 14 }}
                          >
                            4.5
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item>{/* Ratings and review section */}</Grid>
    </Grid>
  );
}
