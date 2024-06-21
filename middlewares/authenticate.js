const jwt = require("jsonwebtoken");

const User = require('../database/models/user.model');
const { UnauthenticatedError } = require("../errors");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization ||  req.headers.token;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader?.split(" ")[1];
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { email: decoded.email }, attributes: ['id', 'uniqueId', 'name', 'email', 'password']})
    req.user = user.dataValues;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authenticate;
