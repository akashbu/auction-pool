import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: 2,
    marginTop: 20,
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

const PropertyDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [buyerdata, setBuyerdata] = useState([]);

  const classes = useStyles();

  const dateFormatting = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/data/${id}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchBuyerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/buyer`);
        const jsonData = await response.json();
        setBuyerdata(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchBuyerData();
  }, []);

  console.log(buyerdata);

  return (
    <>
      <div className={classes.root}>
        <Paper
          sx={{ textAlign: "center", margin: 2, padding: 4, borderRadius: 20, border:1 }}
        >
          <Typography variant="h6" gutterBottom>
            <b>{data.username}</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {data.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address: {data.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Start Amount: ${data.bid}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date: {dateFormatting(data.date)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Interested People: {data.interested}
          </Typography>
        </Paper>
      </div>
      <div>
        {buyerdata.map((item) => {
          if (item.home === data.address)
            return (
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  margin: "auto",
                  border:1,
                  
                }}
                key={item.id}
              >
                <ListItem >
                  <ListItemAvatar>
                    <Avatar>
                     {item.username[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <h3>{item.username}</h3>
                  {/* <ListItemText  primary={item.username} secondary={item.email} /> */}
                </ListItem>
              </List>
            );
        })}
      </div>
    </>
  );
};

export default PropertyDetails;
