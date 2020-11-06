const express = require("express")

// Schemas
const transactionModel = require("./schema")
const paymentMethodsModel = require("../payments/schema")

// Middlewares
const { verifyBalance } = require("./verifyBalance")

const transactionsRoute = express.Router()

// GET all the transactions
transactionsRoute.get("/get-transactions", async(req, res) => {
    try {

        const transactions = await transactionModel.find()

        if(transactions.length < 0){
            res.status(200).send("No transaction saved!")
        }else if(transactions){
            res.status(200).send(transactions)
        }else{
            res.status(400).send("An error occurred while trying to load the transactions")
        }

    } catch (error) {
        console.log(error)
    }
})

// POST a new transaction
transactionsRoute.post("/save-transaction", async(req, res) => {
    try {
        const newTransaction = await new transactionModel(req.body)
        delete newTransaction.type
        delete newTransaction._id
        newTransaction.save()
        console.log(newTransaction)
        res.status(200).send("New transaction saved!")
    } catch (error) {
        console.log(error)
    }
})

// PUT a new balance transfer
transactionsRoute.put("/balance-transfer", verifyBalance, async(req, res, next) => {
    try {
        const sender = await paymentMethodsModel.findById({ _id: req.body.sender })
        const receiver = await paymentMethodsModel.findById({ _id: req.body.receiver })
        
        const newSenderBalance = sender.balance - req.body.movement
        delete sender.balance
        const newReceiverBalance = receiver.balance + req.body.movement
        delete receiver.balance

        const updatedSenderBalance = {
            ...sender,
            balance: newSenderBalance
        }

        const updatedReceiverBalance = {
            ...receiver,
            balance: newReceiverBalance
        }

        await paymentMethodsModel.findByIdAndUpdate( sender._id, updatedSenderBalance )
        await paymentMethodsModel.findByIdAndUpdate( receiver._id, updatedReceiverBalance )

        res.status(201).send("Transfer succefully saved!")
    } catch (error) {
        next(error)
    }
})

// PUT a transaction
transactionsRoute.put("/modify-transaction", async(req, res) => {
    try {
        await transactionModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send("Transaction sussessfully modified!")
    } catch (error) {
        console.log("An error has occured while modifying the transaction", error)
    }
})

// Delete a transaction
transactionsRoute.delete("/delete-transaction", async(req, res) => {
    try {
        await transactionModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted successfully")
    } catch (error) {
        console.log("An error has occured while trying to delete the transaction", error)
    }
})

module.exports = transactionsRoute