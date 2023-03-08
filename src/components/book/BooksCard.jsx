import { Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';


const BooksCard = ({ book }) => {
  return (
    <div className="content-card">
        <Card>

            <CardMedia
                component="img"
                sx={{ pt: 1}}
                image={book.img}
            />

            <CardContent>

                <Typography variant="h6" component="h2">
                    {book.title}
                </Typography>
                
                <Typography variant="subtitle1" component="h2">
                    By {book.author}
                </Typography>
                
                <Typography variant="subtitle1" component="h2">
                    {book.category}
                </Typography>
            
            </CardContent>

            <CardActions style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <Rating name="read-only" value={book.rating} max={5} precision={0.5} readOnly />
            </CardActions>

        </Card>
    </div>
  );
};

export default BooksCard;
