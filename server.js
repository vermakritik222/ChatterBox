const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = 3000;

http.listen(PORT, () => {
  console.log(`app rinning on ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// soket

const io = require("socket.io")(http);

io.on("connection", (soket) => {
  console.log("connected.....");
  soket.on("message", (msg) => {
    soket.broadcast.emit("message", msg);
  });
});
