import { Grid, ThemeProvider, Tooltip } from "@mui/material";
import SearchContentCard from "../contentShowcaseUI/searchContentCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useEffect, useLayoutEffect, useState } from "react";
import { appTheme } from "../../../themes/theme";

const SearchContentGrid = ({ contents, type, buttonClick, setButtonClick }) => {
  const [gridContent, setGridContent] = useState(contents);

  const pageSize = 6;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useLayoutEffect(() => {
    setGridContent(contents);
  }, [contents]);

  useEffect(() => {
    var newContent = contents.slice(pagination.from, pagination.to);
    setGridContent(newContent);
    setPagination({ ...pagination, count: gridContent.length });
  }, [contents, pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };
  return (
    <ThemeProvider theme={appTheme}>
      <Grid sx={{ flexGrow: 1 }} container space={2} mt={3}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {gridContent.map((content) => (
              <div key={content._id}>
                <Grid item>
                  <SearchContentCard
                    content={content}
                    type={type}
                    buttonClick={buttonClick}
                    setButtonClick={setButtonClick}
                  />
                  {type === "movies" && (
                    <Tooltip title={content.title}>
                      <div className="center">
                        {content.title.substring(0, 10) + "..."}
                      </div>
                    </Tooltip>
                  )}
                  {type === "books" && (
                    <Tooltip title={content.title}>
                      <div className="center">
                        {content.title.substring(0, 10) + "..."}
                      </div>
                    </Tooltip>
                  )}
                  {type === "users" && (
                    <div className="center">
                      {content.firstName + " " + content.lastName}
                    </div>
                  )}
                </Grid>
              </div>
            ))}
          </Grid>
        </Grid>
        <div style={{ margin: "auto", marginTop: "25px" }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(contents.length / pageSize)}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </Grid>
    </ThemeProvider>
  );
};

export default SearchContentGrid;
