import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <Grid container spacing={0} justifyContent="center" marginTop="120px">
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 300, border:1, borderRadius:5 }} >
          <CardActionArea>
            <CardMedia
              component="img"
              image="buyer.jpg"
              alt="green iguana"
              sx={{width:200, height:200, marginLeft:"auto", marginRight:"auto"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Buyer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Wanna Register for the Auction?
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/buyer">
              <Button size="small" color="primary">
                Next
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Card sx={{ maxWidth: 300, border:1, borderRadius:5 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="seller.png"
              alt="green iguana"
              sx={{width:200, height:200, marginLeft:"auto", marginRight:"auto"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Seller
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enlist Property for the Auction?
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/seller">
              <Button size="small" color="primary">
                Next
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;
