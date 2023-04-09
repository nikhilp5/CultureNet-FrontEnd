//Author-Nikhil Panikkassery (B00934514)

import { Container, Divider, Typography } from "@mui/material";
import SearchContentGrid from "../contentShowcaseUI/searchContentGrid";

const SearchedMusic = ({ musicResults, buttonClick, setButtonClick }) => {
  return (
    <div>
      <Container fixed>
        <Typography variant="h4" style={{ fontWeight: "500" }} mt={4}>
          Music
        </Typography>
        <Divider />
        {musicResults.length > 0 ? (
          <>
            <SearchContentGrid
              contents={musicResults}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
              type="music"
            />
          </>
        ) : (
          <h2>No Music Available</h2>
        )}
      </Container>
    </div>
  );
};

export default SearchedMusic;
