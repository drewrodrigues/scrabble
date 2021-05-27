import express from "express";
import path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

const http = require("http").Server(app);

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("/", (req: express.Request, res: express.Response) => {
  // res.send("Hello world!");
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

const server = http.listen(3000, () => {
  console.log("Listening on *:3000");
});
