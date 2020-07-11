const express = require("express");
const router = express.Router();

const Data = require("./db");

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

router.post("/", async (req, res) => {
  const data = await Data.insert(req.body);
  try {
    if (req.body.title && req.body.contents) {
      if (data) {
        res.status(201).json(req.body);
      }
    } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

// router.post("/:id/comments", async (req, res) => {
//   try {
//     const data = await Data.insertComment(req.body);
//     if (data) {
//       res.status(201).json(req.body);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "There was an error while saving the comment to the database" });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.remove(id);
    if (data) res.status(200).json({ message: `Post ${id} Deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

module.exports = router;
