const { Schema, model } = require("mongoose")

const transactionSchema = new Schema(
    {
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
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const transactionModel = model("transaction", transactionSchema)
module.exports = transactionModel