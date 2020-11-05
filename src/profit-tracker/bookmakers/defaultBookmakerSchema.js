const { Schema, model } = require("mongoose")

const defaultBookmakerSchema = new Schema (
    {
        bookmakerName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const defaultBookmakerModel = model("defaultBookmaker", defaultBookmakerSchema)
module.exports = defaultBookmakerModel