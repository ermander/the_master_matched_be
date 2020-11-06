const { Schema, model } = require("mongoose")

const paymentMethodsSchema = new Schema(
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
        balance: {
            type: Number,
            required: false
        }
    },
    { timestamps: true }
)

const paymentMethodsModel = model("paymentMethod", paymentMethodsSchema)
module.exports = paymentMethodsModel