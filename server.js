const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const registerRouter = require("./routes/register-route");

const app = express();
app.use(express.json());

// Mongodb Connection
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connected!");
  })
  .catch((err) => console.log(err));

// Welcome message
app.get("/", (req, res) => {
  res.send("Welcome from naturalfoods!");
});

// Routes
app.use("/register", registerRouter);

app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});
