import React, { useState, useEffect } from "react";
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

const MusicLandingPage = () => {
  const temp = [
    {
      "title": "Song 1",
      "artists": ["Artist 1"],
      "album": "Album 1",
      "dateReleased": "2021-01-01T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 2",
      "artists": ["Artist 2"],
      "album": "Album 2",
      "dateReleased": "2021-02-02T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 3",
      "artists": ["Artist 3"],
      "album": "Album 3",
      "dateReleased": "2021-03-03T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 4",
      "artists": ["Artist 4"],
      "album": "Album 4",
      "dateReleased": "2021-04-04T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 5",
      "artists": ["Artist 5"],
      "album": "Album 5",
      "dateReleased": "2021-05-05T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 6",
      "artists": ["Artist 6"],
      "album": "Album 6",
      "dateReleased": "2021-06-06T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 7",
      "artists": ["Artist 7"],
      "album": "Album 7",
      "dateReleased": "2021-07-07T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 8",
      "artists": ["Artist 8"],
      "album": "Album 8",
      "dateReleased": "2021-08-08T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    },
    {
      "title": "Song 9",
      "artists": ["Artist 9"],
      "album": "Album 9",
      "dateReleased": "2021-09-09T00:00:00.000Z",
      "image": "https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
    }
  ];

  const [musicList, setMusicList] = useState([]);
  const [musicRatings, setMovieRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    setMusicList(temp);
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
                  onClick={() => navigateToDetailsPage(123)}
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
                      Release Date: {music.dateReleased.split("T")[0]}
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
