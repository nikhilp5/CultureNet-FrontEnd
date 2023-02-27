import { Card, CardMedia } from "@mui/material";
import ContentControl from "../contentControl/contentControl";

const ContentCard = ({ content, type }) => {
  return (
    <div className="content-card">
      <Card sx={{ display: "flex", m: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={`https://cdn.pixabay.com/photo/2016/11/03/14/18/stamp-1794352_960_720.png`}
          alt={content.title}
        />
        <ContentControl type={type} content={content} display />
      </Card>
    </div>
  );
};

export default ContentCard;
