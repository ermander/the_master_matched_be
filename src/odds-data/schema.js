const { Schema, model } = require("mongoose")

const oddsSchema = new Schema({
    data: {
        type: [],
        required: true
    }
})

const oddsModel = model("odds", oddsSchema)
module.exports = oddsModel