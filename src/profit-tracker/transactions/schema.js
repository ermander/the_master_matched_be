const { Schema, model } = require("mongoose")

const transactionSchema = new Schema(
    {
        holderID: {
            type: String,
            required: true
        },
        accountHolder: {
            type: String,
            required: true
        },
        accountName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        movement: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

const transactionModel = model("transaction", transactionSchema)
module.exports = transactionModel