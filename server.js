const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const authRoute = require("./routes/auth-route");

const app = express();
app.use(express.json());
app.use(cors());

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
app.use("/auth", authRoute);

app.listen(config.PORT, () => {
  console.log(`server is running on port ${config.PORT}`);
});
