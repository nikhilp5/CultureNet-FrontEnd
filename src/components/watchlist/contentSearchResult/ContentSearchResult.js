import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addContentToWatchlist,
  addContentToWatched,
  selectAllWatchlistContent,
  selectAllWatchedContent,
} from "../addContent/contentsSlice";

const ContentSearchResult = ({ content }) => {
  const dispatch = useDispatch();
  const watchListContent = useSelector(selectAllWatchlistContent);
  const watchedContent = useSelector(selectAllWatchedContent);

  let storedContent = watchListContent.find((item) => item.id === content.id);
  let storedWatchedContent = watchedContent.find(
    (item) => item.id === content.id
  );

  const watchlistDisabled = storedContent
    ? true
    : storedWatchedContent
    ? true
    : false;
  const watchedDisabled = storedWatchedContent ? true : false;
  return (
    <Card sx={{ display: "flex", height: 170, m: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
        alt={content.title}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variable="h5">
            {content.title.substring(0, 25)}
          </Typography>
          <Stack space={2} direction="row" sx={{ mt: 6 }}>
            <Button
              variant="contained"
              disabled={watchlistDisabled}
              onClick={() => dispatch(addContentToWatchlist(content))}
            >
              Add to WatchList
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              disabled={watchedDisabled}
              onClick={() => dispatch(addContentToWatched(content))}
            >
              Add to Watched
            </Button>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ContentSearchResult;
