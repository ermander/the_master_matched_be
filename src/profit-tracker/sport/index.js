const express = require("express")

// Schemas
const puntaBancaModel = require("./schema")


const sportRoute = express.Router()

// GET all in progress matches
sportRoute.get("/in-progress", async(req, res) => {
    try {
        const matches = await puntaBancaModel.find({inCorso: true})
        res.status(200).send(matches)      
    } catch (error) {
        console.log("An error has occurred while fetching the in-progress matches", error)
    }
})

// GET a single match
sportRoute.get("/in-progress/:id", async(req, res) => {
    try {
        const id = req.params.id
        const match = await puntaBancaModel.findOne( { _id: id })
        res.status(200).send(match)
    } catch (error) {
        console.log(error)
    }
})

// GET all archived matches
sportRoute.get("/archived", async(req, res) => {
    try {
        const matches = await puntaBancaModel.find({ inCorso: false })
        res.status(200).send(matches)
    } catch (error) {
        console.log("An error has occurred while fetching the archived matches", error)      
    }
})

// POST a new match
sportRoute.post("/save-match", async(req, res) => {
    try {
        // Check is the user/users have the bookmakers active
        // If soo, save the new matched bet
        // Saving the new matched bet
        const newMatch = new puntaBancaModel(req.body)
        newMatch.save()
        console.log(newMatch)
        res.status(201).send(newMatch)        
    } catch (error) {
        res.status(400).send(error)
    }
})

// PUT a current in-progress match
sportRoute.put("/modify-match/:id", async(req, res) => {
    try {
        await puntaBancaModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("Updated successfully");        
    } catch (error) {
        console.log("An error has occured while modifying the match", error)
    }
})

// DELETE any in-progress (Implement even a delete for archived matches?)
sportRoute.delete("/delete-match/:id", async(req, res) => {
    try {
        await puntaBancaModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted successfully")
    } catch (error) {
        console.log("An error has occured while trying to delete the match", error)
    }
})

module.exports = sportRoute