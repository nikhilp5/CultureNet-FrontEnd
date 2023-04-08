import { Card, CardContent, CardMedia, Grid, Typography, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Buffer } from "buffer";

function MovieCard({ movie, onMovieClick, movieRatings }) {
  console.log("Movie Card:", movie);

  let imageSrc = '';
  if (movie.image) {
    if (movie.image.type === "Buffer") {
      imageSrc = `data:image/jpeg;base64,${Buffer.from(movie.image).toString('base64')}`;
    } else {
      imageSrc = movie.image;
    }
  } else{
    imageSrc = '';
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card onClick={() => onMovieClick(movie._id)}>
        <CardMedia
          component="img"
          height="300"
          image={imageSrc}
          alt={movie.title}
          sx={{
            paddingTop: "56.25%", // 16:9 aspect ratio
            width: "100%",
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            height: "17vh",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2" noWrap>
                {movie.title}
              </Typography>
              <Typography noWrap>Release Date: {movie.dateReleased}</Typography>
            </Box>
            <Box sx={{ marginTop: "auto" }}>
              <Rating
                name={`rating-${movie._id}`}
                value={movieRatings[movie._id] || 0}
                precision={0.5}
                max={5}
                readOnly
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MovieCard;