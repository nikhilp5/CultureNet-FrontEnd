import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentControl from '../watchlist/contentControl/contentControl';
import { Buffer } from 'buffer';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function BookDetails() {

    const [book, setBook] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");
    console.log(userId);
    const location = useLocation();
    const id = location?.state?.id;
    const email = localStorage.getItem("email");
    console.log(email);
    const [buttonClick, setButtonClick] = useState(false);

    useEffect(() => {
    
        if(!localStorage.getItem("token")) {navigate("/")}
         fetch(
            `${process.env.REACT_APP_BASE_URL}`+`/books/${id}`,
              { headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => response.json())
            .then((data) => {
                setBook(data);
            })
        .catch((error) => console.log(error));
    }, [id,buttonClick]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const { image, title, authors, publisher, isbn, summary, genre, dateReleased } = book;

    let imageSrc = '';
    if (image) {
      if (image.type === "Buffer") {
        imageSrc = `data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`;
      } else {
        imageSrc = image;
      }
    } else{
      imageSrc = '';
    }

    const releaseDate = new Date(dateReleased);
    const formattedDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (

    <Paper
        style={{ marginTop: '20px' }}
        sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 1000,
            flexGrow: 1,
            backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
    >
    <Grid container spacing={2}>

        <Grid item sx={{ width: 'auto' }}>
            <ButtonBase sx={{ width: 'auto', height: 600 }}>
                <Img
                alt="complex"
                src={imageSrc}
                />
            </ButtonBase>
        </Grid>

        <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h4" component="div">
                    {title}
                </Typography>
                <div style={{position:'relative',float:'right',bottom:'50px',right:"20px"}}>
                <ContentControl 
                    type="books" content={book} buttonClick={buttonClick}
                    setButtonClick={setButtonClick}
                />
                </div>
                <Rating
                    name="text-feedback"
                    value={3.5}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />

                <Typography variant="subtitle1">
                    By {authors}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {formattedDate}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ color: 'black'}}gutterBottom>
                    Category: {genre}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ color: 'black'}}>
                    Published By {publisher}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    ISBN {isbn}
                </Typography>
                
                <Typography variant="h5" gutterBottom> Summary </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }} gutterBottom>
                    {summary}
                </Typography>
            </Box>
        </Grid>

    </Grid>
</Paper>

);}