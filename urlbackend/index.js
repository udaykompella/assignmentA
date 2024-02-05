const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const shortid = require("shortid");
const Url = require("./Url");
const utils = require("./util/util");

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

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
