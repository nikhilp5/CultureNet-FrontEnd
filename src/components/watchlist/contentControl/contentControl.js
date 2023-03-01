import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Stack, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addContentToWatched,
  removeContentFromWatchlist,
  moveContentToWatchlistFromWatched,
  removeContentFromWatched,
} from "../addContent/contentsSlice";

const ContentControl = ({ type, content, display }) => {
  const dispatch = useDispatch();

  return (
    <div className={`notdisplayed ${display}`}>
      {type === "watchlist" && (
        <Stack direction="row">
          <Tooltip title="Add To Watched" placement="top">
            <Button onClick={() => dispatch(addContentToWatched(content))}>
              <Visibility />
            </Button>
          </Tooltip>
          <Tooltip title="Remove" placement="top">
            <Button
              onClick={() => dispatch(removeContentFromWatchlist(content.id))}
            >
              <Clear />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {type === "watched" && (
        <Stack direction="row">
          <Tooltip title="Add To Watchlist" placement="top">
            <Button
              onClick={() =>
                dispatch(moveContentToWatchlistFromWatched(content))
              }
            >
              <VisibilityOff />
            </Button>
          </Tooltip>
          <Tooltip title="Remove" placement="top">
            <Button
              onClick={() => dispatch(removeContentFromWatched(content.id))}
            >
              <Clear />
            </Button>
          </Tooltip>
        </Stack>
      )}
    </div>
  );
};

export default ContentControl;
