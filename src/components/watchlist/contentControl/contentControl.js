//Author-Nikhil Panikkassery (B00934514)

import {
  Clear,
  DownloadDone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../../utils/UserContext";

const ContentControl = ({ type, content, buttonClick, setButtonClick }) => {
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const addContentToWatchlist = () => {
    handleOpen();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + "/addToWatchlist/",
        {
          type: type,
          content: content,
          userid: localStorage.getItem("id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Added to Watchlist");
        setOpenSnackbar(true);
        setButtonClick(!buttonClick);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Something went wrong! Please refresh to try again..."
        );
        setOpenSnackbar(true);
        handleClose();
      });
  };
  const removeContentFromWatchlist = () => {
    handleOpen();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + "/removeFromWatchlist/",
        {
          type: type,
          content: content,
          userid: localStorage.getItem("id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Removed from Watchlist");
        setOpenSnackbar(true);
        setButtonClick(!buttonClick);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Something went wrong! Please refresh to try again..."
        );
        setOpenSnackbar(true);
        handleClose();
      });
  };

  const addContentToWatched = () => {
    handleOpen();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + "/addToWatched/",
        {
          type: type,
          content: content,
          userid: localStorage.getItem("id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Added to Watched");
        setOpenSnackbar(true);
        setButtonClick(!buttonClick);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Something went wrong! Please refresh to try again..."
        );
        setOpenSnackbar(true);
        handleClose();
      });
  };

  const removeContentFromWatched = () => {
    handleOpen();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + "/removeFromWatched/",
        {
          type: type,
          content: content,
          userid: localStorage.getItem("id"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSnackbarSeverity("success");
        setSnackbarMessage("Removed from Watched");
        setOpenSnackbar(true);
        setButtonClick(!buttonClick);
        handleClose();
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Something went wrong! Please refresh to try again..."
        );
        setOpenSnackbar(true);
        handleClose();
      });
  };

  return (
    <div className="notdisplayed">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {content.watchlist === undefined && content.watched === undefined && (
        <Stack direction="row">
          <Tooltip title="Add To Watchlist" placement="top">
            <Button onClick={addContentToWatchlist}>
              <Visibility />
            </Button>
          </Tooltip>
          <Tooltip title="Add To Watched" placement="top">
            <Button onClick={addContentToWatched}>
              <DownloadDone />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {content.watchlist === true && (
        <Stack direction="row">
          <Tooltip title="Remove from Watchlist" placement="top">
            <Button onClick={removeContentFromWatchlist}>
              <VisibilityOff />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {content.watched === true && (
        <Stack direction="row">
          <Tooltip title="Remove from Watched" placement="top">
            <Button onClick={removeContentFromWatched}>
              <Clear />
            </Button>
          </Tooltip>
        </Stack>
      )}
    </div>
  );
};

export default ContentControl;
