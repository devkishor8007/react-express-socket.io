const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./config.env",
});

const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);

const io = socketUtils.sio(server);

socketUtils.connection(io);

// middlware
const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

app.use(cors());

app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
  req.io.emit("message", `hello ${req.originalUrl}`);
  res.send("hello world!!");
});

server.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});
