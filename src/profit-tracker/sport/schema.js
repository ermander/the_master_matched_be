const { Schema, model } = require("mongoose")

const puntaBancaSchema = new Schema (
    {
        data: {
            type: String,
            required: true
        },
        ora: {
            type: String,
            required: true
        },
        sport: {
            type: String,
            required: false
        },
        home: {
            type: String,
            required: true
        },
        away : {
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
        tipoPuntata: {
            type: String,
            required: true
        },
        book: {
            type: String,
            required: true
        },
        
        puntata: {
            type: String,
            required: true
        },
        quotaPunta: {
            type: String,
            required: true
        },
        exchange: {
            type: String,
            required: true
        },        
        bancata: {
            type: String,
            required: false
        },
        quotaBanca: {
            type: String,
            required: true
        },
        puntataBonus: {
            type: String,
            required: false
        },
        puntataRimborso: {
            type: String,
            required: false
        },
        rischio: {
            type: String,
            required: false
        },
        commissione: {
            type: String,
            required: false,
            default: "5"
        },
        tag: {
            type: String,
            required: false
        },
        inCorso: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

const puntaBancaModel = model("match", puntaBancaSchema)
module.exports = puntaBancaModel