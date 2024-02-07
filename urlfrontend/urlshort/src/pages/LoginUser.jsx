// import React from "react";
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
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const myStyle = {
  padding: "2rem",
};

const marginTopBottom = {
  marginTop: "1rem",
  marginBottom: "1rem",
};
export function LoginUser() {
  debugger;
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [rejectMess, setrejectMess] = useState("");
  const [rejectFlag, setrejectFlag] = useState(false);
  // const { userName, userToken, success, message, msgId, user, loading } = useSelector((state) => state.auth)
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  // const data = useContext(UserContext)
  let token = localStorage.getItem("token");
  const handlesubmit = (e) => {
    debugger;
    e.preventDefault();
    // setisLoading(true);
    debugger;
    createApiCall();
  };
  const createApiCall = async () => {
    debugger;
    try {
      let url = "http://localhost:4001/login";
      let input = {
        Email: Email,
        password: password,
        // isAdmin: isAdmin,
      };
      let response = await axios.post(url, input);

      let result = await response.data;
      console.log(result, "resultlogin");
      if (result.status === "success") {
        // setSuccessMess("Successfully Signed");
        // setsuccessFlag(true);
        localStorage.setItem("token", result.token);
        navigate("/urlshortener");
      } else if (result.msgId == -1) {
        setrejectFlag(true);
        setrejectMess(result.message);
      } else {
        setrejectMess(result.message);
      }
      setEmail("");
      setpassword("");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  return (
    <>
      <Paper elevation={10} square={true} style={myStyle}>
        <Grid align="center">
          <h2 style={marginTopBottom}>Login User</h2>
          <Grid align="center">
            <TextField
              style={marginTopBottom}
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              type="Email"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid align="center">
            <TextField
              style={marginTopBottom}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid align="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button"
              onClick={handlesubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          {rejectFlag === true ? (
            <Typography variant="body1" color="error">
              <Link to="/CreateUser">{rejectMess}</Link>
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Paper>
    </>
  );
}

export default LoginUser;
