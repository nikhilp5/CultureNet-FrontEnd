import { Card, CardMedia } from "@mui/material";
import ContentControl from "../../watchlist/contentControl/contentControl";

const SearchContentCard = ({ content, type, buttonClick, setButtonClick }) => {
  return (
    <div className="content-card">
      <Card sx={{ display: "flex", m: 1 }}>
        {type === "movies" && (
          <div>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
              alt={content.title}
            />
            <ContentControl
              type="movies"
              content={content}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
            />
          </div>
        )}
        {type === "books" && (
          <div>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
              alt={content.title}
            />
            <ContentControl
              type="books"
              content={content}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
            />
          </div>
        )}
        {type === "users" && (
          <div>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
              alt={content.firstName}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchContentCard;
