const { Schema, model } = require("mongoose")

const signUpIn = new Schema({
    name: {
        type: String,
        min: 3,
        max: 15
    },
    surname: {
        type: String,
        min: 2,
        max: 15
    },
    nickname: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
},
    {timestamps: true}
)

const signUpInModel = model("signUpIn", signUpIn)
module.exports = signUpInModel