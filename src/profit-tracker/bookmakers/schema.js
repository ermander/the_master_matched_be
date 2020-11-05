const { Schema, model } = require("mongoose")

const bookmakerSchema = new Schema(
    {
        holderID: {
            type: String,
            required: true
        },
        bookmakerName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        balance: {
            type: String,
            required: false
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
)

const bookmakerModel = model("bookmakers", bookmakerSchema)
module.exports = bookmakerModel