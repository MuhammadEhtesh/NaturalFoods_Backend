const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Register = require("../models/register");

const router = express.Router();

router.post("/register", (req, res) => {
  const newRegister = new Register(req.body);
  Register.create(newRegister, (err, doc) => {
    if (err) {
      return res.status(404).send(err);
    }
    res.status(200).json(doc);
  });
});

router.post("/login", (req, res) => {
  Register.find(
    { username: req.body.username, password: req.body.password },
    (err, user) => {
      if (err) {
        return res.status(404).send(err);
      }
      jwt.sign(
        { user },
        config.JsonSecretKey,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) {
            res.status(404).send(err);
          }
          res.status(200).json({
            token: token,
            user: user,
          });
        }
      );
    }
  );
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
