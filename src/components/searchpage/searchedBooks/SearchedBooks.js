import { Divider, Container, Typography } from "@mui/material";
import SearchContentGrid from "../contentShowcaseUI/searchContentGrid";

const SearchedBooks = ({ bookResults }) => {
  return (
    <div>
      <Container fixed>
        <Typography variant="h4" style={{ fontWeight: "500" }} mt={4}>
          Books
        </Typography>
        <Divider />
        {bookResults.length > 0 ? (
          <>
            <SearchContentGrid contents={bookResults} />
          </>
        ) : (
          <h2>No Books Available</h2>
        )}
      </Container>
    </div>
  );
};

export default SearchedBooks;
