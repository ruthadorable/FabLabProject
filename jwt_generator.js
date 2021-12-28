const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const options = {
  issuer: "Fablab token generator",
  audience: "Fablab API",
  expiresIn: "24h",
};

function generate(userId, email) {
  const payload = {
    id: userId,
    email: email,
  };
  return jwt.sign(payload, secret, options);
}

module.exports = { generate, options, secret };
