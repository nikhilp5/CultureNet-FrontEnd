import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const useStyles = makeStyles(()=>({
 

  
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: ".1rem solid #282c34",
    borderRadius: 10,
    color: "white",
    position: 'absolute',
    padding: '.5rem 0.5rem 1.5rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

  ContentModal__landscape: {
    objectFit: 'contain',
    borderRadius: '0.6rem',
  },
  ContentModal__portrait: {
    display: 'none',
    objectFit: 'contain',
    borderRadius: '0.6rem',
  },
  tagline: {
    paddingBottom: '0.6rem',
    alignSelf: 'center',
  },
  ContentModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    backgroundColor: '#eaeaea',
    color: '#1d3a4d',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  ContentModal__about: {
    padding: '0.6rem',
    width: '95%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto, sans-serif',
    justifyContent: 'space-evenly',
    fontWeight: '300',
  },
  ContentModal__title: {
    height: '12%',
    fontSize: '5vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentModal__description: {
    display: 'flex',
    height: '40%',
    overflowY: 'scroll',
    padding: '1.25rem',
    borderRadius: '1.25rem',
    scrollbarWidth: 'thin', /* Firefox */
    boxShadow: 'inset 0 0 0.3rem #000000',
    textAlign: 'justify',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '@media (min-width: 835px)': {
    ContentModal__landscape: {
      display: 'none',
    },
    ContentModal__portrait: {
      display: 'flex',
      width: '38%',
    },
    ContentModal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: '.6rem 0',
    },
    ContentModal__about: {
      width: '58%',
      padding: '0',
      height: '100%',
    },
    ContentModal__title: {
      fontSize: '3.5vw',
    },
    ContentModal__description: {
      fontSize: '1.5rem',
    },
  },
}));

  



export default function ContentModal({children,id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [content, setContent]=useState();
  const API_URL =`https://api.themoviedb.org/3/movie/${id}?api_key=b6ed2e93ce4d889b4cc1315d000cb974`;

  const fetchData = async () => {
    const { data } = await axios.get(
      API_URL)

    setContent(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
//  console.log(content)
  const classes = useStyles();
  return (
    <div>
      <Button  onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (<Box className={classes.paper}>
          <div  className={classes.ContentModal}>
            <img src={API_IMG+ content.poster_path}
            alt={content.title} 
            className={classes.ContentModal__portrait}
            />
            <img
                  src={
                    API_IMG+content.backdrop_path
                      
                  }
                  alt={content.name || content.title}
                  className={classes.ContentModal__landscape}
                />
                <div className={classes.ContentModal__about}>
                  <span className={classes.ContentModal__title}>
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className={classes.tagline}>{content.tagline}</i>
                  )}

                  <span className={classes.ContentModal__description}>
                    {content.overview}
                  </span>
                  </div>
                  

          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
      
     </Typography>
          </Box>)}
        </Fade>
      </Modal>
    </div>
  );
}
