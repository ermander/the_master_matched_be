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

//POST a new payment method
paymentsRoute.post("/new-payment-method", async(req, res) => {
    try {
        const newPaymentMethod = await new paymentMethodsModel(req.body)
        const checkUserExist = await userModel.findOne({name: newPaymentMethod.accountHolder})
        if(checkUserExist){
            newPaymentMethod.save()
            console.log(newPaymentMethod)
            res.status(200).send(newPaymentMethod)
        }else{
            console.log("You have to create a new user before create a payment method")
        }        
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