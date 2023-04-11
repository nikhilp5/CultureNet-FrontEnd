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
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentControl from '../watchlist/contentControl/contentControl';
import UserReview from './BookRating';
import { Buffer } from 'buffer';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function BookDetails() {

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [hasReview, setHasReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [ratingUser, setRatingUser] = useState(0);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const location = useLocation();
    const id = location?.state?.id;

    const email = localStorage.getItem("email");
    const [buttonClick, setButtonClick] = useState(false);

    const onEdit = (content, rating, reviewId) => {

        if(!localStorage.getItem("token")) { navigate("/") }
            fetch(
                `${process.env.REACT_APP_BASE_URL}/reviews/${reviewId}`,
                {
                  method: "PUT", 
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" 
                  },
                  body: JSON.stringify({
                    "rating": rating,
                    "comment": content
                })
                }
              ).then((response) => {
                console.log("response json is: " + response.json());
            })
              .then((data) => {
                fetchAllReviews(book._id);  
              })
              .catch((error) => console.log(error));
      };

    useEffect(() => {
    
        if(!localStorage.getItem("token")) {
            navigate("/")}
         fetch(
            `${process.env.REACT_APP_BASE_URL}`+`/books/${id}`,
              { headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => response.json())
            .then((data) => {
                setBook(data);
                fetchAllReviews(id);
            })
        .catch((error) => console.log(error));
    }, [id,buttonClick]);

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the default form submission behavior
        setFormData(new FormData(event.target)); 

        const userObj = JSON.parse(localStorage.getItem('user'));
        
        if(!localStorage.getItem("token")) { navigate("/") }
        const apiBody = JSON.stringify({
            "userId": userObj._id,
            "contentId": book._id,
            "rating": ratingUser,
            "totalRating": 5,
            "comment": reviewText,
            "category": "books",
            "userName": (userObj.firstName && userObj.lastName) ? (userObj.firstName + userObj.lastName): "User X"
        })

        fetch(
            `${process.env.REACT_APP_BASE_URL}/reviews`,
            {
              method: "POST", 
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" 
              },
              body: apiBody
            }
          ).then((response) => {
            console.log("response json is: " + response.json());
        })
          .then((data) => {
            fetchAllReviews(book._id);  
          })
          .catch((error) => console.log(error));
      };


    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData
        });
    }
    
    const fetchAllReviews = (contentId) => {
    
        if(!localStorage.getItem("token")) {navigate("/")}
         fetch(
            `${process.env.REACT_APP_BASE_URL}`+`/reviews?contentId=${contentId}`,
              { headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => response.json())
            .then((data) => {
                if (data){
                    const updatedData = data.map((record, index) => {
                        
                        const userObj = JSON.parse(localStorage.getItem('user'));
    
                        let isUserReview = false;
    
                        if (userObj._id == record.userId){
                            isUserReview = true;
                            setHasReview(true);
                        }
                        return {
                            ...record,
                            belongsToUser: isUserReview
                        }
                    })
                    setReviews(updatedData);
                }
                else {
                    setReviews([]);
                }
            })
        .catch((error) => console.log(error));
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    if (!reviews) {
        return <div>Loading User Reviews..</div>
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

    const releaseDate = new Date(book.dateReleased);
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

                {/* <Grid item sx={{ width: 'auto' }}>
                    <ButtonBase sx={{ width: 'auto', height: 600 }}>
                        <Img
                        alt="complex"
                        src={book.image_url}
                        />
                    </ButtonBase>
                </Grid> */}

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
                    {book.title}
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
                            By {book.authors}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Published On {formattedDate}
                        </Typography>

                        <Typography variant="h6" color="text.secondary" sx={{ color: 'black'}}gutterBottom>
                            Category: {book.genre}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ color: 'black'}}>
                            Published By {book.publisher}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            ISBN {book.isbn}
                        </Typography>
                        
                        <Typography variant="h5" gutterBottom> Summary </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify' }} gutterBottom>
                            {book.summary}
                        </Typography>
                    </Box>
                </Grid>

            </Grid>

            { !hasReview && 
                <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Write a Review
                </Typography>
                <Typography component="legend">Rating:</Typography>
                <Rating
                  name="userRating"
                  value={ratingUser}
                  
                  onChange={(event) => setRatingUser(event.target.value)}
                />
                <TextField
                    id="review-text"
                    name="userComment"
                    label="Review"
                    multiline
                    fullWidth
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Comment
                </Button>
            </form>
            }

            <Grid>
                {reviews.map( (review) => (
                    <Grid item key={review} md={4}>
                        <UserReview review={review} onEdit={onEdit} />
                    </Grid>
                ))}
            </Grid>

        </Paper>
    );
}