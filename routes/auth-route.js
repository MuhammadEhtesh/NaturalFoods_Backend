const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Register = require("../models/register");

const router = express.Router();
const saltRounds = 10;
const tokenExpiration = "1h";

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    const newRegister = new Register(req.body);
    Register.create(newRegister, (err, doc) => {
      if (err) {
        return res.status(404).send(err);
      }
      res.status(200).json(doc);
    });
  });
});

router.post("/login", (req, res) => {
  Register.findOne({ email: req.body.emailPhone }, (err, user) => {
    if (err) {
      return res.status(404);
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(404);
      }
      jwt.sign(
        { user },
        config.JsonSecretKey,
        { expiresIn: tokenExpiration },
        (err, token) => {
          if (err) {
            res.status(404).json(err);
          }
          res.status(200).json({
            token: token,
            user: user,
          });
        }
      );
    });
  });
});

// basic implementation for jwt verification
router.get("/registers", verifyToken, (req, res) => {
  jwt.verify(req.token, config.JsonSecretKey, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Register.find((err, registers) => {
        if (err) {
          return res.send(err);
        }
        res.json({
          authData,
          registers,
        });
      });
    }
  });
});

// jwt token verification
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
