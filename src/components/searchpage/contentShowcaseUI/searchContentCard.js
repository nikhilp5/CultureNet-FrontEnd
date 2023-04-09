//Author-Nikhil Panikkassery (B00934514)

import { Card, CardMedia } from "@mui/material";
import ContentControl from "../../watchlist/contentControl/contentControl";
import { useNavigate } from "react-router";
import { Buffer } from "buffer";

const SearchContentCard = ({ content, type, buttonClick, setButtonClick }) => {
  const navigate = useNavigate();
  let id = content._id;
  const handleMovieClick = () => {
    navigate("/MovieDetail", { state: { id } });
  };

  const handleBookClick = () => {
    navigate("/bookdetail", { state: { id } });
  };

  const handleMusicClick = () => {
    navigate("/MusicDetails/"+id);
  };

  return (
    <div className="content-card">
      <Card sx={{ display: "flex", m: 1, width: 150, height: 200 }}>
        {type === "movies" && (
          <div>
            <CardMedia
              component="img"
              sx={{ width: 150, height: 200 }}
              image={content.image && content.image.type === "Buffer"?`data:image/jpeg;base64,${Buffer.from(content.image).toString('base64')}`:content.image}
              alt={content.title}
              onClick={handleMovieClick}
              style={{ cursor: "pointer" }}
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
              image={content.image && content.image.type === "Buffer"?`data:image/jpeg;base64,${Buffer.from(content.image).toString('base64')}`:content.image}
              alt={content.title}
              onClick={handleBookClick}
              style={{ cursor: "pointer" }}
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
        {type === "music" && (
          <div>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={content.image && content.image.type === "Buffer"?`data:image/jpeg;base64,${Buffer.from(content.image).toString('base64')}`:content.image}
              alt={content.title}
              onClick={handleMusicClick}
              style={{ cursor: "pointer" }}
            />
            <ContentControl
              type="music"
              content={content}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchContentCard;
