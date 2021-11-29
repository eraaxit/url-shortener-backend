import express from "express";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import URL from "../models/Schema.js";
import generateShort from "../utils/short.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("THIS IS THE HOMEPAGE");
});

router.post("/api/", async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  try {
    let shortURL = generateShort();
    let url = await URL.findOne({ shortURL: shortURL });

    while (url) {
      shortURL = generateShort();
      url = await URL.findOne({ shortURL: shortURL });
    }

    const newUrl = new URL({ longURL: req.body.longURL, shortURL: shortURL });
    const shortened = await newUrl.save();

    res.send(shortened);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/api/:shortURL", async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  try {
    let result = await URL.findOne({ shortURL: req.params.shortURL });
    if (!result) {
      res.send("No user Found");
    }
    res.send(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

export default router;
