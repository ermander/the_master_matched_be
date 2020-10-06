const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const brcrypt = require("bcryptjs");
const v = require("validator");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: String,
    default: false
  },
  refreshTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
},
{ timestamps: true }
)


UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email });
    const isMatch = await brcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Unable to login");
      err.httpStatusCode = 401;
      throw err;
    }
    return user;
};
  
UserSchema.pre("save", async function (next) {
    const user = this;
  
    if (user.isModified("password")) {
      user.password = await brcrypt.hash(user.password, 8);
    }  
    next();
});
  
UserSchema.post("validate", function (error, doc, next) {
    if (error) {
      error.httpStatusCode = 400;
      next(error);
    } else {
      next();
    }
});
  
UserSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      error.httpStatusCode = 400;
      next(error);
    } else {
      next();
    }
});

const UserModel = mongoose.model("User", UserSchema);
  
module.exports = UserModel;