import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function CardItem(props) {
  const countCheck = async (urlLink) => {
    debugger;
    let response = await axios.get(urlLink);
    console.log(response, "shortCode");
    let result = await response.data;
    // setResult(result.data);
    // setResultFlag(true);
  };
  return (
    <Card
      sx={{
        background: "white",
        marginBottom: "1rem",
        marginTop: "1rem",
        width: "100%",
      }}
    >
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
        <div onClick={countCheck(props.urlLink)}>{props.urlLink}</div>
      </CardActions>
    </Card>
  );
}

export default CardItem;
