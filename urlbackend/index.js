const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const shortid = require("shortid");
const Url = require("./Url");
const User = require("./User");
const utils = require("./util/util");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./config.env" });

const DB =
  "mongodb+srv://youtube:NRvkvufTiYQwdqic@cluster0.tsxnp3q.mongodb.net";
// configure dotenv
dotenv.config();
// const app = express();

// cors for cross-origin requests to the frontend application
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// Database connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// get all saved URLs
app.get("/all", async (req, res) => {
  try {
    const originalUrl = await Url.find();

    res.status(200).json({
      status: "success",
      data: originalUrl,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error,
    });
  }
});

// URL shortener endpoint
app.post("/short", async (req, res) => {
  debugger;
  console.log("HERE", req.body.url);
  const { origUrl } = req.body;
  const base = `http://localhost:4000`;
  const puppeteer = require("puppeteer");

  const urlId = shortid.generate();
  if (utils.validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(200).json("Invalid Original Url");
  }
});

// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url);
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

app.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      Email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
    // res.status(201).json({
    //   status: "success",
    //   data: newUser,
    // });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
});

app.post("/login", async (req, res, next) => {
  console.log(req.body, ">>>>");
  const { Email, password } = req.body;

  //1) check if email and password exists
  if (!Email || !password) {
    res.status(401).json({
      status: "fail",
      message: "please check your email and password",
    });
  }
  //2) check if user exists && password is correct
  const user = await User.findOne({ Email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  //3) If everything is ok send token to the client

  createSendToken(user, 200, res);
});

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
