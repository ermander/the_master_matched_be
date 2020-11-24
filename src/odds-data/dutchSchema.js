const { Schema, model } = require("mongoose")

const dutchSchema = new Schema({
    data: {
        type: [],
        required: true
    }
})

const dutchModel = model("dutch", dutchSchema)
module.exports = dutchModel