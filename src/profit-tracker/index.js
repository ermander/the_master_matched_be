const express = require("express")

// Schemas
const puntaBancaModel = require("./puntaBancaSchema")
const userModel = require("./userSchema")
const paymentMethodsModel = require("./paymentMethodsSchema")

const router = express.Router()

// SPORT SECTION

// GET all in progress matches
router.get("/in-progress", async(req, res) => {
    try {
        const matches = await puntaBancaModel.find({inCorso: true})
        res.status(200).send(matches)      
    } catch (error) {
        console.log("An error has occurred while fetching the in-progress matches", error)
    }
})

// GET a single match
router.get("/in-progress/:id", async(req, res) => {
    try {
        const id = req.params.id
        const match = await puntaBancaModel.findOne( { _id: id })
        res.status(200).send(match)
    } catch (error) {
        console.log(error)
    }
})

// GET all archived matches
router.get("/archived", async(req, res) => {
    try {
        const matches = await puntaBancaModel.find({ inCorso: false })
        res.status(200).send(matches)
    } catch (error) {
        console.log("An error has occurred while fetching the archived matches", error)      
    }
})

// POST a new match
router.post("/save-match", async(req, res) => {
    try {
        const newMatch = await new puntaBancaModel(req.body)
        newMatch.save()
        console.log(newMatch)
        res.status(201).send(newMatch)        
    } catch (error) {
        res.status(400).send(error)
    }
})

// PUT a current in-progress match
router.put("/modify-match/:id", async(req, res) => {
    try {
        await puntaBancaModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("Updated successfully");        
    } catch (error) {
        console.log("An error has occured while modifying the match", error)
    }
})

// DELETE any in-progress (Implement even a delete for archived matches?)
router.delete("/delete-match/:id", async(req, res) => {
    try {
        await puntaBancaModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted successfully")
    } catch (error) {
        console.log("An error has occured while trying to delete the match", error)
    }
})

// USER MANAGEMENT

// Get full list of users
router.get("/get-users", async(req, res) => {
    try {
        const users = await userModel.find()
        if(users){
            console.log(users)
            res.status(201).send(users)
        }else{
            console.log("No users into the database")
        }
    } catch (error) {
        console.log(error)
    }
})

// Get a single user
router.get("get-user", async(req, res) => {
    try {
        const name = req.body.name
        const user = await userModel.find({ name: name })
        if(user){
            console.log(user)
            res.status(201).send(user)
        }else{
            console.log("No user found!")
        }
    } catch (error) {
        console.log(error)
    }
})

// POST a new user
router.post("/new-user", async(req, res) => {
    try {
        const newUser = await new userModel(req.body)
        newUser.save()
        console.log(newUser)
        res.status(201).send(newUser)  
        
    } catch (error) {
        console.log(error)        
    }
})

// PUT an existing user
router.put("/modify-user", async(req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.body.id, req.body)
        res.status(200).send("Modified successfully")
    } catch (error) {
        console.log(error)
    }
})

// PAYMENT METHODS

//GET all payment methods
router.get("/payment-methods", async(req, res) => {
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
router.post("/new-payment-method", async(req, res) => {
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
router.put("/modify-payment-method", async (req, res) => {
    try {
        await paymentMethodsModel.findByIdAndUpdate(req.body.id, req.body)
        res.status(200).send("Updated successfully")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
