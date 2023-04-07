import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function BookDetails() {
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
                src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71c-1s150eL.jpg"
                />
            </ButtonBase>
        </Grid>

        <Grid item xs sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h4" component="div">
                    A brief History of Time
                </Typography>

                <Rating
                    name="text-feedback"
                    value={3.5}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />

                <Typography variant="subtitle1">
                    By Stephen Hawkings
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    14th January, 1960
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ color: 'black'}}gutterBottom>
                    Category: Popular Science
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Published by J. B. Lippincott & Co.
                </Typography>
                

                <Typography variant="body2" color="text.secondary" gutterBottom>
                    ISBN 978-0446310789
                </Typography>
                
                <Typography variant="h5" gutterBottom> Summary </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }} gutterBottom>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum varius sit. Tincidunt id aliquet risus feugiat in ante metus dictum. Mi sit amet mauris commodo quis imperdiet massa. Eu mi bibendum neque egestas congue quisque egestas diam in. Lobortis mattis aliquam faucibus purus. Volutpat lacus laoreet non curabitur gravida. Eu turpis egestas pretium aenean pharetra. Et malesuada fames ac turpis egestas sed tempus urna et. Platea dictumst vestibulum rhoncus est pellentesque. Purus sit amet volutpat consequat. Proin nibh nisl condimentum id venenatis. Pulvinar pellentesque habitant morbi tristique. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum varius sit. Tincidunt id aliquet risus feugiat in ante metus dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum varius sit. Tincidunt id aliquet risus feugiat in ante metus dictum.
                </Typography>
            </Box>
        </Grid>

    </Grid>
</Paper>

);}