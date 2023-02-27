import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../common/Navbar";
import { selectAllWatchlistContent } from "../addContent/contentsSlice";
import ContentGrid from "../contentShowcaseUI/contentGrid";
import PageToggle from "../pageToggle/PageToggle";

const WatchListContent = () => {
  const watchListContents = useSelector(selectAllWatchlistContent);
  return (
    <div>
      <Navbar />
      <PageToggle />
      <Container fixed>
        <Typography variant="h4" style={{ fontWeight: "600" }} mt={4}>
          My WatchList
        </Typography>
        {watchListContents.length > 0 ? (
          <>
            <ContentGrid contents={watchListContents} type="watchlist" />
          </>
        ) : (
          <h2>No Content Added</h2>
        )}
      </Container>
    </div>
  );
};

export default WatchListContent;
