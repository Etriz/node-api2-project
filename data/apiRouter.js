const express = require("express");
const router = express.Router();

const Data = require("./db");
const { findById } = require("./db");

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
    const { id } = req.params;
    const data = await Data.findById(id);
    data.length !== 0
      ? res.status(200).json(data)
      : res.status(404).json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.findPostComments(id);
    data.length !== 0
      ? res.status(200).json(data)
      : res.status(404).json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The comments information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.title && req.body.contents) {
      const data = await Data.insert(req.body);
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

router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const postID = await findById(id);
    if (postID.length > 0 && text) {
      const data = await Data.insertComment({ text: text, post_id: id });
      data.length !== 0 ? res.status(201).json({ text: text }) : null;
    } else if (postID.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else if (!text) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Data.remove(id);
    if (data) {
      res.status(200).json({ message: `Post ${id} has been deleted` });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idExists = await findById(id);
    const post = req.body;
    if (idExists.length > 0 && post.title && post.contents) {
      const data = await Data.update(id, post);
      res.status(200).json(post);
    } else if (idExists.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else if (!post.title || !post.contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  }
});

module.exports = router;
