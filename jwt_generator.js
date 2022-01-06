const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const options = {
  issuer: "MonProjetDemo token generator",
  audience: "MonProjetDemo API",
  expiresIn: "24h",
};

function generate(userId, username,role_id) {
  const payload = {
    sub: userId,
    preferred_username: username,
    role_user: role_id
  };
  return jwt.sign(payload, secret, options);
}

module.exports = { generate, options, secret };
