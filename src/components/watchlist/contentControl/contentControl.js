import { Clear, Visibility } from "@mui/icons-material";
import { Button, Stack, Tooltip } from "@mui/material";
import axios from "axios";

const ContentControl = ({ type, content, buttonClick, setButtonClick }) => {
  const addContentToWatchlist = () => {
    axios
      .post(
        "https://culturenet-apis-develop.netlify.app/.netlify/functions/api/addToWatchlist/",
        {
          type: type,
          content: content,
        }
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert("Error in updating- " + error);
      });
  };
  const removeContentFromWatchlist = () => {
    axios
      .post(
        "https://culturenet-apis-develop.netlify.app/.netlify/functions/api/removeFromWatchlist/",
        {
          type: type,
          content: content,
        }
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert("Error in updating- " + error);
      });
  };

  return (
    <div className="notdisplayed">
      {content.watchlist === undefined && (
        <Stack direction="row">
          <Tooltip title="Add To Watchlist" placement="top">
            <Button onClick={addContentToWatchlist}>
              <Visibility />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {content.watchlist === true && (
        <Stack direction="row">
          <Tooltip title="Remove from watchlist" placement="top">
            <Button onClick={removeContentFromWatchlist}>
              <Clear />
            </Button>
          </Tooltip>
        </Stack>
      )}
    </div>
  );
};

export default ContentControl;
