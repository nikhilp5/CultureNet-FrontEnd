import { Card, CardMedia } from "@mui/material";

const SearchContentCard = ({ content }) => {
  return (
    <div className="content-card">
      <Card sx={{ display: "flex", m: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
          alt={content.title}
        />
      </Card>
    </div>
  );
};

export default SearchContentCard;
