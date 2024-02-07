import axios from "axios";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from "react";
// import { popUp } from "../Helper";
// import { PostService } from "../util/Services";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Card from "./CardItem";
import { Button, Grid, TextField, Typography } from "@mui/material";
const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState([]);
  const [resultFlag, setResultFlag] = useState(false);
  //  useEffect(())
  const fetchurls = async () => {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let url = "http://localhost:4001/all";
      let response = await axios.get(url, config);
      let result = await response.data;
      console.log(result, "resulturl");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchurls();
  }, [url]);

  const onSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (!url) {
      alert("please enter something");
      return;
    } else {
      try {
        let token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        let response = await axios.post(
          "http://localhost:4001/api/url/shorten",
          {
            originalUrl: url,
          },
          config
        );
        console.log(response, "shortresponse");
        let result = response.data;

        setResult(result.data);
        setResultFlag(true);
      } catch (error) {
        console.log(error, "error");
      }
      // axios
      //   .post("http://localhost:4000/short", { origUrl: url })
      //   .then((res) => {
      //     debugger;
      //     console.log(res.data, "shortresponse");
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //   });
    }

    setUrl("");
  };
  // console.log(url);
  const myStyle = {
    padding: "2rem",
  };

  const marginTopBottom = {
    marginTop: "1rem",
    marginBottom: "1rem",
  };
  // function FormRow() {
  //   return (
  //     <React.Fragment>
  //       <Grid item xs={4}>
  //         {/* <Item>Item</Item> */}
  //         <h1>Original Url</h1>
  //       </Grid>
  //       <Grid item xs={4}>
  //         {/* <Item>Item</Item> */}
  //         <h1>Short Url</h1>
  //       </Grid>
  //       <Grid item xs={4}>
  //         {/* <Item>Item</Item> */}
  //         <h1>Clicks</h1>
  //       </Grid>
  //     </React.Fragment>
  //   );
  // }

  return (
    <>
      <Paper elevation={10} square={true} style={myStyle}>
        <h2 style={marginTopBottom}>Shorten Url</h2>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={8}>
            <TextField
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={marginTopBottom}
              type="text"
              id="outlined-basic"
              label="URL"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {/* <Typography>
          
        </Typography> */}
      </Paper>
      {/* <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid> */}
      {/* <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid> */}
      {/* </Grid> */}
      <Grid container>
        {resultFlag &&
          result.map((link) => {
            return (
              <>
                <Grid item xs={12}>
                  <Card urlLink={link} />
                </Grid>
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default UrlShortener;
