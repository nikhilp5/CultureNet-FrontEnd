import { Container, Divider, Typography } from "@mui/material";
import SearchContentGrid from "../contentShowcaseUI/searchContentGrid";

const SearchedUsers = ({ userResults }) => {
  return (
    <div>
      <Container fixed>
        <Typography variant="h4" style={{ fontWeight: "500" }} mt={4}>
          Users
        </Typography>
        <Divider />
        {userResults.length > 0 ? (
          <>
            <SearchContentGrid contents={userResults} />
          </>
        ) : (
          <h2>No Users Available</h2>
        )}
      </Container>
    </div>
  );
};

export default SearchedUsers;
