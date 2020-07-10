const express = require("express");
const router = express.Router();

const Data = require("./db");

// router.get("/", (req, res) => {
//   Data.find().then().catch();
// });

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    data ? res.status(200).json(data) : res.status(404).json({ message: "No posts found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    data
      ? res.status(200).json(data)
      : res.status(404).json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const data = await Data.findPostComments(req.params.id);
    data
      ? res.status(200).json(data)
      : res.status(404).json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The comments information could not be retrieved." });
  }
});

module.exports = router;
