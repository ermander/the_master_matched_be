const { Schema, model } = require("mongoose")
const v = require("validator");

const userSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
)

const userModel = model("users", userSchema)
module.exports = userModel