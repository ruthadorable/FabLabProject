const express = require("express");
const router = express.Router();
const debug = require("debug")("ProjetFabLab:api:FABLAB");
const { User } = require("../models/schema");
const { verify } = require("../password_hash");
const { generate } = require("../jwt_generator");

router.post("/generate", async function (req, res, next) {
  debug("Generate token");
  const username = req.body.username;
  const passwordToVerify = req.body.password;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (user != null && (await verify(user.password, passwordToVerify))) {
    const token = generate(user.id, user.username);
    res.json({ token: token });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
