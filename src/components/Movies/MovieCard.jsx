import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Hidden, Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import ContentModal from './ContentModel';
import Badge from '@mui/material/Badge'

// const useStyles = makeStyles(({ theme }) => ({
//   root: {
//     display:'flex',
//     flexDirection:'column',
//     maxHeight: '25rem',
//     padding:'5px',
//     width: '13rem',
  
//     margin: '5px',
//     backgroundColor: '#1d3a4d',
//     overflow: 'hidden',
//     position: 'relative',
//     boxShadow: '0px 5px 10px 0px',
//     '&:hover $overview': {
//       transform: 'translateY(0%)',
//     },
//   },
//   media: {
//     width: '12.4rem',
//     height: '12rem',
    
//   },
//   info: {
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'space-between',
//     padding: '0 2px',
//     marginTop:'5px',
//     backgroundColor:'#1d3a4d',
//     color:'white'
 
//   },
//   title: {
//     width:'100%',
  
//    fontFamily: 'sans-serif',
//     fontWeight: 'bold',
    
//   },

//   vote: {
//     width:'100%',
  
//     fontFamily: 'sans-serif',
//      fontWeight: 'bold',
     
//    },

  
 
//   overview: {
//     transform: 'translateY(100%)',
//     position: 'absolute',
//     top: '0',
//     bottom: '0',
//     left: '0',
//     right: '0',
//     backgroundColor: 'white',
//     padding: '10px',
//     overflow: 'auto',
//     marginTop: '5px',
//     borderRadius: '1.5rem',
//     transition: '0.3s ease-in-out',
//     color:'#1d3a4d'
//   },
// }));


const useStyles = makeStyles({
  media: {
    display: 'flex',
    flexDirection: 'column',
    width: '12rem',
    padding: '.5rem',
    margin: '.5rem 0',
    backgroundColor: '#282c34',
    borderRadius: '.5rem',
    position: 'relative',
    fontFamily: '"Montserrat", sans-serif',
    '&:hover': {
      backgroundColor: 'white',
      color: 'black',
    },
    '@media (max-width: 550px)': {
      width: '46%',
    },
  },
  poster: {
    borderRadius: '.5rem',
    height:'12rem',

  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: '1rem',
    padding: '.5rem 0',
  },
  subTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '0.25rem',
    padding: '0 0.20rem',
    borderBottom: '',
  },
});

const MovieCard = (props) => {
  const classes = useStyles();
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  // console.log(props)
  console.log(props.id)
  const media_type="movie"
  const unavailable="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Funavailable&psig=AOvVaw0UYzUiCA9zM1teCljRdJ4X&ust=1677703545435000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOCBpvCKuf0CFQAAAAAdAAAAABAJ"
  return (
    <ContentModal id={props.id}>
      
    {/* <Card className={classes.root} onMouseEnter={() => setIsOverviewVisible(true)}
    onMouseLeave={() => setIsOverviewVisible(false)}>
  
      <CardMedia
        className={classes.media}
        image={API_IMG + props.poster_path}
        title={props.title}
      />
      <CardContent className={classes.info}>
        <Typography variant="h5" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="body1" className={classes.vote}>
           {props.vote_average}
        </Typography>
        {isOverviewVisible && (<Typography variant="body1" className={classes.overview}>
          <strong>Overview:</strong> {props.overview}
        </Typography>)}
      </CardContent>
     
    </Card> */}

  <Badge
        badgeContent={props.vote_average}
        color={props.vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className={classes.poster}
        src={props.poster_path ? `${API_IMG}${props.poster_path}` : unavailable}
        alt={props.title}
      />
      <b className={classes.title}>{props.title}</b>
      
     </ContentModal>
  );
}

export default MovieCard;
