import * as express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome from naturalfoods!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
