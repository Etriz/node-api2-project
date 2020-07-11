const express = require("express");
const apiRouter = require("./data/apiRouter.js");

const server = express();

server.use(express.json());
server.use("/api/posts", apiRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "it's working", name: "api2 project" });
});

module.exports = server;
