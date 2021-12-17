const argon2 = require("argon2");

const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 14,
  timeCost: 2,
  parallelism: 1,
};

function hash(password) {
  return argon2.hash(password, options);
}

function verify(passwordHash, passwordToVerify) {
  return argon2.verify(passwordHash, passwordToVerify);
}

module.exports = { hash, verify };
