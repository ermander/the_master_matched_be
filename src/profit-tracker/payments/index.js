const express = require("express")

//Schemas
const paymentMethodsModel = require("./schema")
const userModel = require("../users/userSchema")

const paymentsRoute = express.Router()

//GET all payment methods
paymentsRoute.get("/payment-methods", async(req, res) => {
    try {
        const paymentMethods = await paymentMethodsModel.find()
        if(paymentMethods){
            res.status(200).send(paymentMethods)
        }else{
            console.log("No payment methods found!")
        }
    } catch (error) {
        console.log(error)
    }
})

//GET a payment methods based on filters
paymentsRoute.get("/payment-methods/:id", async(req, res) =>  {
    try {
        const paymentMethods = await paymentMethodsModel.find({holderID: req.params.id})
        if(paymentMethods){
            res.status(200).send(paymentMethods)
        }else{
            res.send(404).send("Not found!")
        }
    } catch (error) {
        console.log(error)
    }
})

//POST a new payment method
paymentsRoute.post("/new-payment-method", async(req, res) => {
    try {
        const newPaymentMethod = await new paymentMethodsModel(req.body)
        console.log(newPaymentMethod)
        // Check if there is a user existent who can have payment methods saved
        const checkUserExist = await userModel.findById({_id: newPaymentMethod.holderID})
        // Check if the user already have a payment method named the same
        const checkPaymentMethodExist = await paymentMethodsModel.findOne({accountName: newPaymentMethod.accountName, holderID: newPaymentMethod.holderID})
        if(!checkUserExist){
            console.log("You have to create a new user before!")
            res.status(400).send("You have to create a new user before!")
        }else if(checkUserExist && checkPaymentMethodExist){
            console.log("You can not create 2 istance of the same payment method!", checkUserExist, checkPaymentMethodExist)
            res.status(400).send("You can not create 2 istance of the same payment method!")
        }else{
            console.log(newPaymentMethod)
            await newPaymentMethod.save()
            res.status(200).send("New payment method successfully created!")
        }
    } catch (error) {
        console.log(error)
    }
})

// PUT una nuova ricarica o spesa
paymentsRoute.put("/ricarica-spesa", async(req, res) => {
    try {
        const data = req.body

        const transfer = await paymentMethodsModel.findOne({
            _id: data.id,
            accountName: data.accountName
        })

        if(!transfer){
            res.status(400).send("Payment method not found!")
            console.log("Payment method not found!")
        }else if(data.type == "Ricarica"){
            await paymentMethodsModel.findByIdAndUpdate({
                _id: transfer._id
            },
            {
                balance: parseInt(transfer.balance + data.movement)
            })
            res.status(200).send("OK")
        }else{
            await paymentMethodsModel.findByIdAndUpdate({
                _id: transfer._id
            },
            {
                balance: parseInt(transfer.balance - data.movement)
            })
            res.status(200).send("OK")
        }

    } catch (error) {
        console.log(error)
    }
})

// PUT a new one to one trasferment
paymentsRoute.put("/trasferment", async(req, res) => {
    try {
        const data = req.body
        const receiver = await paymentMethodsModel.findById({_id: data.receiver})
        const sender = await paymentMethodsModel.findById({_id: data.sender})

        const receiverNewBalance = receiver.balance + data.movement
        const senderNewBalance = sender.balance - data.movement

        await paymentMethodsModel.findByIdAndUpdate({
            _id: receiver._id
        }, {
            balance: receiverNewBalance
        })
        await paymentMethodsModel.findByIdAndUpdate({
            _id: sender._id
        },
        {
            balance: senderNewBalance
        })
        res.status(200).send("OK")
        console.log("ok")
    } catch (error) {
        console.log(error)
    }
})

//PUT a payment method
paymentsRoute.put("/modify-payment-method", async (req, res) => {
    try {
        await paymentMethodsModel.findByIdAndUpdate(req.body.id, req.body)
        res.status(200).send("Updated successfully")
    } catch (error) {
        console.log(error)
    }
})

//DELETE an existing payment method
paymentsRoute.delete("/delete-payment-method/:id", async(req, res) => {
    try {
        const id = req.params.id
        await paymentMethodsModel.findByIdAndDelete(id)
        res.status(200).send("Deleted!")
    } catch (error) {
        console.log(error)
    }
})

module.exports = paymentsRoute