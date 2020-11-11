const express = require("express")
const bookmakerModel = require("../bookmakers/schema")

// Schemas
const userModel = require("./userSchema")
const paymentMethodsModel = require("../payments/schema")
const puntaBancaModel = require("../sport/schema")
const transactionModel = require("../transactions/schema")

const usersRoute = express.Router()

// Get full list of users
usersRoute.get("/get-users", async(req, res) => {
    try {
        const users = await userModel.find()
        if(users){
            res.status(201).send(users)
        }else{
            console.log("No users into the database")
        }
    } catch (error) {
        console.log(error)
    }
})

// Get a single user
usersRoute.get("/get-user", async(req, res) => {
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
usersRoute.post("/new-user", async(req, res) => {
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
usersRoute.put("/modify-user", async(req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.body.id, req.body)
        res.status(200).send("Modified successfully")
    } catch (error) {
        console.log(error)
    }
})

// DELETE an existeng user. If an user is deleted, all his kind of records will be deleted too.
usersRoute.delete("/delete-user/:id", async(req, res) => {
    try {
        /* await bookmakerModel.findByIdAndDelete({holderID: req.params.id})
        await paymentMethodsModel.findByIdAndDelete({holderID: req.params.id})
        await puntaBancaModel.findByIdAndDelete({holderID: req.params.id})
        await transactionModel.findByIdAndDelete({holderID: req.params.id})*/
        await userModel.findOneAndDelete(req.params.id) 
        res.status(200).send("Deleted successfully")
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = usersRoute