const { Schema, model } = require("mongoose")

const matchSchema = new Schema (
    {
        data: {
            type: String,
            required: true
        },
        sport: {
            type: String,
            required: false
        },
        evento: {
            type: String,
            required: true
        },
        torneo: {
            type: String,
            required: false
        },
        mercato: {
            type: String,
            required: true
        },
        tipoPunta: {
            type: String,
            required: true
        },
        book: {
            type: String,
            required: true
        },
        stake: {
            type: String,
            required: true
        },
        quota: {
            type: String,
            required: true
        },
        rischio: {
            type: String,
            required: false
        },
        stakeBonus: {
            type: String,
            required: true
        },
        stakeRimborso: {
            type: String,
            required: false
        },
        commissione: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: false
        },
        inCorso: {
            type: ["yes", "no"]
        }
    },
    { timestamps: true }
)

const matchModel = model("match", matchSchema)
module.exports = matchModel