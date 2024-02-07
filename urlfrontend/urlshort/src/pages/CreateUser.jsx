import axios from "axios";
import React, { useRef, useState } from "react";
// import { popUp } from "../Helper";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
// import { useSelector, useDispatch } from "react-redux";
// import { createUser } from "../redux/authActions";
import { Link } from "react-router-dom";

function CreateUser() {
  debugger;
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [Email, setEmail] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [successMess, setSuccessMess] = useState("");
  const [successFlag, setsuccessFlag] = useState(false);
  const [isAdmin, setisAdmin] = useState("No");
  const [isLoading, setisLoading] = useState(false);
  const nameref = useRef(null);
  const passwordref = useRef(null);
  //   const { loading, message, msgId } = useSelector((state) => state.auth)
  //   const dispatch = useDispatch()
  const handlesubmit = (e) => {
    debugger;
    e.preventDefault();
    setisLoading(true);
    debugger;
    createApiCall();
  };

  const createApiCall = async () => {
    debugger;
    try {
      let url = "http://localhost:4001/signup";
      let input = {
        name: name,
        Email: Email,
        password: password,
        passwordConfirm: passwordConfirm,
        // isAdmin: isAdmin,
      };
      let response = await axios.post(url, input);

      let result = await response.data;
      console.log(result, "resultsignup");
      setisLoading(false);
      if (result.status === "success") {
        setSuccessMess("Successfully Signed");
        setsuccessFlag(true);
      }
      setname("");
      setEmail("");
      setpassword("");
      setpasswordConfirm("");
    } catch (error) {
      console.log(error);
    }

    // console.log(result, "createUser");
    // console.log("ref1", nameref);
    // console.log("ref2", passwordref);
    // if (result.msgId === -1) {
    //   popUp({ message: result.message, icons: "error", title: "Error" }).then(
    //     (event) => {
    //       if (event.isConfirmed) {
    //       }
    //       return;
    //     }
    //   );
    // } else if (result.msgId === 0) {
    //   popUp({
    //     message: result.message,
    //     icons: "success",
    //     title: "Success",
    //   }).then((event) => {
    //     if (event.isConfirmed) {
    //     }
    //     return;
    //   });
    // }
  };

  const handleChange = (e) => {
    debugger;
    setisAdmin(e.target.value);
  };
  // const handlesubmit1 = () => {
  //   debugger;
  //   const data = {
  //     name: name,
  //     password: password,
  //     isAdmin: isAdmin
  //   }
  //   dispatch(createUser(data))
  //   debugger
  //   if (msgId === -1) {
  //     popUp({ message: message, icons: "error", title: "Error" }).then(
  //       (event) => {
  //         if (event.isConfirmed) {
  //         }
  //         return;
  //       }
  //     );
  //   } else if (msgId === 0) {
  //     popUp({
  //       message: message,
  //       icons: "success",
  //       title: "Success",
  //     }).then((event) => {
  //       if (event.isConfirmed) {
  //       }
  //       return;
  //     });
  //   }

  //   setname("")
  //   setpassword("")
  // }
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: "20vw",
    margin: "20px auto",
  };
  return (
    <>
      {isLoading ? (
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid style={{ height: "100vh" }}>
          <Paper elevation={10} style={paperStyle} square={true}>
            <Grid align="center" sx={{ margin: "10px", height: "100%" }}>
              <h2>Create User</h2>
              <Grid sx={{ margin: "1rem" }}>
                <TextField
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="email"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  ref={nameref}
                />
              </Grid>
              <Grid sx={{ margin: "1rem" }}>
                <TextField
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="text"
                  // ref={passwordref}
                />
              </Grid>
              <Grid sx={{ margin: "1rem" }}>
                <TextField
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  // ref={passwordref}
                />
              </Grid>
              <Grid sx={{ margin: "1rem" }}>
                <TextField
                  value={passwordConfirm}
                  onChange={(e) => setpasswordConfirm(e.target.value)}
                  id="outlined-basic"
                  label="Password Confirm"
                  variant="outlined"
                  type="password"
                  // ref={passwordref}
                />
              </Grid>
              <Grid align="center" sx={{ margin: "1rem" }}>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">
                  Admin
                </FormLabel> */}
                {/* <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={isAdmin}
                  onChange={handleChange}
                >
                  <Grid align="center" sx={{ margin: "2rem" }}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </Grid>
                </RadioGroup> */}
              </Grid>
              <Grid sx={{ margin: "1rem" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button-block"
                  onClick={handlesubmit}
                  fullWidth
                >
                  Submit
                </Button>
                <p>{successMess}</p>
                {successFlag === true ? (
                  <h3>
                    <Link to="/">Click Here to Login</Link>
                  </h3>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </>
  );
}

export default CreateUser;
