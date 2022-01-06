const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const options = {
  issuer: "Fablab token generator",
  audience: "Fablab API",
  expiresIn: "24h",
};

<<<<<<< HEAD
function generate(userId, email) {
  const payload = {
    id: userId,
    email: email,
=======
function generate(userId, username,role_id) {
  const payload = {
    sub: userId,
    preferred_username: username,
    role_user: role_id
>>>>>>> cc70686f5dae2964c6e6a79b83761092eb44f708
  };
  return jwt.sign(payload, secret, options);
}

module.exports = { generate, options, secret };
