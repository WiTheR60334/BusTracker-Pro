// const { NextApiRequest } = require("next");
// const { decode } = require("next-auth/jwt");

// if (!process.env.JWT_COOKIE_NAME) {
//   throw new Error("JWT_COOKIE_NAME not set");
// }

// async function decodeReq(req) {
//   const sessionToken = req.cookies[process.env.JWT_COOKIE_NAME];
//   const token = await decode({
//     token: sessionToken,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   return token;
// }

// module.exports = {
//   decodeReq,
// };

const express = require('express');
const { Student } = require('./DB');

const router = express.Router();

router.post('/students', async (req, res) => {
  try {
    const { name, enrollmentNo, address, parentsMobileNo, alternateMobileNo } = req.body;

    const student = new Student({
      name,
      enrollmentNo,
      address,
      parentsMobileNo,
      alternateMobileNo,
    });

    await student.save();

    res.status(201).json({ message: 'Student details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
