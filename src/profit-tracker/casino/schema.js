const { Schema, model } = require("mongoose")

const casinoSchema = new Schema(
    {
        bookmakerID: {
            type: String,
            required: true
        },
        bookmakerName: {
            type: String,
            required: false
        },
        bookmakerHolder: {
            type: String,
            required: false
        },
        movement: {
            type: Number,
            required: true
        },
        type: {
            type: ["Casino", "Casino Live", "Slot RTP+", "Altro"],
            required: true
        },
        descrizione: {
            type: String,
            required: false
        }
    }
    ,
    {timestamps: true}
)

const casinoModel = model("casino", casinoSchema)
module.exports = casinoModel