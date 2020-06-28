const Register = require("../models/register");
const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const newRegister = new Register(req.body);
  Register.create(newRegister, (err, doc) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json(doc);
  });
});

module.exports = router;
