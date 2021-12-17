const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const options = {
  issuer: "MonProjetDemo token generator",
  audience: "MonProjetDemo API",
  expiresIn: "24h",
};

function generate(userId, username) {
  const payload = {
    sub: userId,
    preferred_username: username,
  };
  return jwt.sign(payload, secret, options);
}

module.exports = { generate, options, secret };
