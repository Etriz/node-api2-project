const express = require("express");
const router = express.Router();

const Data = require("./db");

// router.get("/", (req, res) => {
//   Data.find().then().catch();
// });

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    data ? res.status(200).json(data) : res.status(404);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
