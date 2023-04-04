import { Container, Divider, Typography } from "@mui/material";
import SearchContentGrid from "../contentShowcaseUI/searchContentGrid";

const SearchedMovies = ({ movieResults, buttonClick, setButtonClick }) => {
  return (
    <div>
      <Container fixed>
        <Typography variant="h4" style={{ fontWeight: "500" }} mt={4}>
          Movies
        </Typography>
        <Divider />
        {movieResults.length > 0 ? (
          <>
            <SearchContentGrid
              contents={movieResults}
              buttonClick={buttonClick}
              setButtonClick={setButtonClick}
              type="movies"
            />
          </>
        ) : (
          <h2>No Movies Available</h2>
        )}
      </Container>
    </div>
  );
};

export default SearchedMovies;
