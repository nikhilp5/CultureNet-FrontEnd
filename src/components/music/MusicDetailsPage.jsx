import * as React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Box,
  Rating,
} from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";

export default function MusicDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();

  React.useEffect(()=>{
    console.log(params)
  })

  return (
    <Grid container direction="column">
      <Grid item>
        <Box
          display="flex"
          alignItems="left"
          sx={{ marginTop: 5, marginLeft: 20 }}
        >
          <ArrowBackIosNewRounded
            style={{ fontSize: 32 }}
            onClick={() => {
              navigate("/music");
            }}
          />
        </Box>
      </Grid>
      <Grid item>
        <Card sx={{ marginLeft: 35, marginRight: 35 }}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <CardMedia
                component="img"
                height="100%"
                image="https://images.unsplash.com/photo-1517494680532-a0bab3e73738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                alt="Card Image"
                sx={{objectFit:"cover"}}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={1} sm={1} />
                  <Grid item xs={10} sm={10}>
                    <Grid container direction="column" align="left">
                      <Grid item>
                        <Typography variant="h3" component="h3">
                          Song
                        </Typography>
                        <Typography variant="h3" component="h3">
                          Song
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h5" component="h5">
                          Album
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="h6">
                          Artist 1, Artist 2
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body"
                          component="p"
                          marginTop={2.5}
                        >
                          Released: {2013}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Box display="flex" alignItems="center" marginTop={1}>
                          <Rating
                            name="read-only"
                            precision={0.5}
                            value={4.5}
                            readOnly
                            style={{ fontSize: 14 }}
                          />
                          <Typography
                            variant="body"
                            component="p"
                            marginLeft={1}
                            style={{ marginLeft: 10, fontSize: 14 }}
                          >
                            4.5
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item>{/* Ratings and review section */}</Grid>
    </Grid>
  );
}
