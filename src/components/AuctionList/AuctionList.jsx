import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 2,
    marginTop: 20,
  },
  paper: {
    padding: 4,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 30,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  emoji: {
    fontSize: "1.5rem",
    margin: 1,
  },
  textField: {
    width: "100%",
    marginTop: 2,
    marginBottom: 1,
  },
}));

const List = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const dateFormatting = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper sx={{ ...classes.paper, textAlign: "center" }}>
              <div className={classes.image}>
                <img
                  src={item.file}
                  alt="Architecture"
                  className={classes.image}
                  height={250}
                  width={250}
                />
              </div>
              <Typography variant="h6" gutterBottom>
                {item.username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: {item.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Start Amount: ${item.bid}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date: {dateFormatting(item.date)}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Link to={`/auctionList/${item.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    View
                  </Button>
                  </Link>
                </Grid>
                <Grid item xs>
                  <AddReactionOutlinedIcon color="primary" /> {item.interested}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
