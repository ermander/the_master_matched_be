const express = require("express");
const { authenticate, refreshToken } = require("./authTools");
const { authorize } = require("../middlewares/authorize");
const { verifyJWT } = require("./authTools");
const UserModel = require("./schema");
const loginRouter = express.Router();

// Registration route
loginRouter.post("/signup", async (req, res, next) => {
    try {
      console.log(req.body);
      const newUser = new UserModel(req.body);
      const { _id } = await newUser.save();
      console.log("user saved");
      res.status(201).send({ _id });
    } catch (error) {
      console.log(error);
      next(error);
    }
});

// Login route
loginRouter.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
     next(error);
  }
});
  
loginRouter.post("/refreshToken", async (req, res, next) => {
  const oldRefreshToken = req.body.refreshToken;
  if (!oldRefreshToken) {
    const err = new Error("Forbidden");
    err.httpStatusCode = 403;
    next(err);
  } else {
    try {
      const newTokens = await refreshToken(oldRefreshToken);
      res.send(newTokens);
    } catch (error) {
      console.log(error);
      const err = new Error(error);
      err.httpStatusCode = 403;
      next(err);
    }
  }
});
  
loginRouter.post("/logout", authorize, async (req, res, next) => {
  try {
    req.user.refreshTokens = req.user.refreshTokens.filter(
      (t) => t.token !== req.body.refreshToken
    );
    await req.user.save();
    res.send();
  } catch (err) {
     next(err);
  }
});

module.exports = loginRouter;