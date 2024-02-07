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
const authMiddleware = require("./authMiddleware");

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
// app.get("/all", authMiddleware, async (req, res) => {
//   try {
//     let userId = req.user.id;
//     const result = await Url.find(userId);
//     console.log(originalUrl, "adfgdfg");
//     res.status(200).json({
//       status: "success",
//       data: originalUrl,
//     });
//   } catch (error) {
//     res.status(401).json({
//       status: "fail",
//       message: error,
//     });
//   }
// });

// URL shortener endpoint
// app.post("/short", async (req, res) => {
//   debugger;
//   console.log("HERE", req.body.url);
//   const { origUrl } = req.body;
//   const base = `http://localhost:4000`;
//   const puppeteer = require("puppeteer");

//   const urlId = shortid.generate();
//   if (utils.validateUrl(origUrl)) {
//     try {
//       let url = await Url.findOne({ origUrl });
//       if (url) {
//         res.json(url);
//       } else {
//         const shortUrl = `${base}/${urlId}`;

//         url = new Url({
//           origUrl,
//           shortUrl,
//           urlId,
//           date: new Date(),
//         });

//         await url.save();
//         res.json(url);
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).json("Server Error");
//     }
//   } else {
//     res.status(200).json("Invalid Original Url");
//   }
// });
app.post("/api/url/shorten", authMiddleware, async (req, res) => {
  try {
    const { originalUrl } = req.body;
    // const shortCode = generateShortCode();
    const shortCode = shortid.generate();
    const userId = req.user.id;
    const baseUrl = "http://localhost:4001";
    const shortenedUrl = `${baseUrl}/${shortCode}`;
    const newURL = new Url({ originalUrl, shortCode, userId, shortenedUrl });
    await newURL.save();
    const result = await Url.find({ userId });
    const arr = result.map((data) => data.shortenedUrl);
    res.json({
      status: "success",
      data: arr,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });

    if (url) {
      // Increment the click count or perform any analytics tracking here if needed
      url.clicks++;
      const clicks = url.clicks;
      await url.save();

      // Redirect the user to the original URL
      res.redirect(url.originalUrl);
      res.status(200).json({
        status: "success",
        clicks,
      });
    } else {
      res.status(404).json({ msg: "Shortened URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// redirect endpoint
// app.get("/:urlId", async (req, res) => {
//   try {
//     const url = await Url.findOne({ urlId: req.params.urlId });
//     console.log(url);
//     if (url) {
//       url.clicks++;
//       url.save();
//       return res.redirect(url.origUrl);
//     } else res.status(404).json("Not found");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Server Error");
//   }
// });
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  return res.status(statusCode).json({
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
      Email: req.body.Email,
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
  try {
    const { Email, password } = req.body;

    //1) check if email and password exists
    if (!Email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "please check your email and password",
      });
    }
    //2) check if user exists && password is correct
    const user = await User.findOne({ Email }).select("+password");

    if (!user) {
      return res.status(200).json({
        msgId: -1,
        status: "fail",
        message: "User Not Found! Please SignUp....",
      });
    }
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    //3) If everything is ok send token to the client

    createSendToken(user, 200, res);
  } catch (error) {
    console.log(error);
  }
});

// app.post("/protect", );

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
