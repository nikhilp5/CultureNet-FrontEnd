import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useGetContentMutation } from "../../../contentApi";
import Navbar from "../../common/Navbar";
import ContentSearchResult from "../contentSearchResult/ContentSearchResult";
import PageToggle from "../pageToggle/PageToggle";

const AddContent = () => {
  const [query, setQuery] = useState("");
  const [getContent, { data }] = useGetContentMutation();

  useEffect(() => {
    if (query) {
      fetchContent();
    }
  }, [query]);

  const fetchContent = async () => {
    await getContent({ query });
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <PageToggle />
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "570px",
          alignContent: "center",
          marginTop: "50px",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 540,
          }}
        >
          <InputBase
            sx={{ m1: 1, flex: 1 }}
            placeholder="Search movie/book"
            value={query}
            onChange={handleSearch}
          ></InputBase>
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <div className="results">
          {data?.results?.length > 0 &&
            data?.results?.map((content) => (
              <ContentSearchResult content={content} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddContent;
