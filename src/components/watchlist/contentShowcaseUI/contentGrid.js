import { Grid } from "@mui/material";
import ContentCard from "./contentCard";

const ContentGrid = ({ contents, type }) => {
  return (
    <Grid sx={{ flexGrow: 1 }} container space={2} mt={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {contents.map((content) => (
            <div key={content.id}>
              <Grid item>
                <ContentCard content={content} type={type} />
                <div className="center">{content.title.substring(0, 20)}</div>
              </Grid>
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContentGrid;
