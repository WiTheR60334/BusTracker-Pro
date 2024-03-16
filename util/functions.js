const { NextApiRequest } = require("next");
const { decode } = require("next-auth/jwt");

if (!process.env.JWT_COOKIE_NAME) {
  throw new Error("JWT_COOKIE_NAME not set");
}

async function decodeReq(req) {
  const sessionToken = req.cookies[process.env.JWT_COOKIE_NAME];
  const token = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return token;
}

module.exports = {
  decodeReq,
};
