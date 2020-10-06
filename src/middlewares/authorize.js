const RegistrationModel = require("../auth/schema");
const { verifyJWT } = require("../auth/authTools");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await verifyJWT(token);
    const user = await RegistrationModel.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    const err = new Error("Please authenticate");
    err.httpStatusCode = 401;
    next(err);
  }
};

module.exports = { authorize };