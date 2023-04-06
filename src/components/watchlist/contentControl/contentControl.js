import {
  Clear,
  DownloadDone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { Button, Stack, Tooltip } from '@mui/material';
import axios from 'axios';

const ContentControl = ({ type, content, buttonClick, setButtonClick }) => {
  const addContentToWatchlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + '/addToWatchlist/',
        {
          type: type,
          content: content,
          userid: JSON.parse(localStorage.getItem('user'))._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert('Error in updating- ' + error);
      });
  };
  const removeContentFromWatchlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + '/removeFromWatchlist/',
        {
          type: type,
          content: content,
          userid: JSON.parse(localStorage.getItem('user'))._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert('Error in updating- ' + error);
      });
  };

  const addContentToWatched = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + '/addToWatched/',
        {
          type: type,
          content: content,
          userid: JSON.parse(localStorage.getItem('user'))._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert('Error in updating- ' + error);
      });
  };

  const removeContentFromWatched = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}` + '/removeFromWatched/',
        {
          type: type,
          content: content,
          userid: JSON.parse(localStorage.getItem('user'))._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setButtonClick(!buttonClick);
      })
      .catch((error) => {
        alert('Error in updating- ' + error);
      });
  };

  return (
    <div className='notdisplayed'>
      {content.watchlist === undefined && content.watched === undefined && (
        <Stack direction='row'>
          <Tooltip title='Add To Watchlist' placement='top'>
            <Button onClick={addContentToWatchlist}>
              <Visibility />
            </Button>
          </Tooltip>
          <Tooltip title='Add To Watched' placement='top'>
            <Button>
              <DownloadDone onClick={addContentToWatched} />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {content.watchlist === true && (
        <Stack direction='row'>
          <Tooltip title='Remove from Watchlist' placement='top'>
            <Button onClick={removeContentFromWatchlist}>
              <VisibilityOff />
            </Button>
          </Tooltip>
        </Stack>
      )}

      {content.watched === true && (
        <Stack direction='row'>
          <Tooltip title='Remove from Watched' placement='top'>
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
