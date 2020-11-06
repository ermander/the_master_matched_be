const express = require("express")

// Schemas
const bookmakerModel = require("./schema")
const userModel = require("../users/userSchema")
const defaultBookmakerModel = require("./defaultBookmakerSchema")

const bookmakersRoute = express.Router()

// GET all active bookmakers
bookmakersRoute.get("/bookmakers", async(req, res) => {
    try {
        const bookmakers = await bookmakerModel.find({ isActive: true })
        if(bookmakers){
            res.status(200).send(bookmakers)
        }else{
            console.log("No bookmakers found!")
        }
    } catch (error) {
        console.log(error)
    }
})

//GET all default bookmakers
bookmakersRoute.get("/default-bookmakers", async(rea, res) => {
    try {
        const defaultBoomakers = await defaultBookmakerModel.find()
        if(defaultBoomakers){
            res.status(200).send(defaultBoomakers)
        }else{
            res.status(404).send("An error occurred while trying to fetch all fedault bookmakers")
        }
    } catch (error) {
        console.log(error)
    }
})

// POST a default bookmaker
bookmakersRoute.post("/new-default-bookmaker", async(req, res) => {
    try {
        const newDefaultBookmaker = await new defaultBookmakerModel(req.body)
        const checkUniqueness = await defaultBookmakerModel.findOne({ bookmakerName: req.body.bookmakerName})
        if(checkUniqueness){
            res.status(401).send("You can not create a dupplicate of a bookmaker!")
        }else{
            await newDefaultBookmaker.save()
            console.log(newDefaultBookmaker)
            res.status(200).send("New bookmakers successfully created!")
        }
    } catch (error) {
        console.log(error)
    }
})

// POST a new bookmaker
bookmakersRoute.post("/new-bookmaker", async(req, res) => {
    try {
        const newBookmaker = await new bookmakerModel(req.body)
        const checkUniqueness = await bookmakerModel.findOne({
            holderID: req.body.holderID,
            bookmakerName: req.body.bookmakerName
        })
        const checkBookmakerExist = await defaultBookmakerModel.findOne({ bookmakerName: req.body.bookmakerName })

        if(!checkBookmakerExist){
            res.status(400).send("You have to initialize the new bookmakers!")
        }

        if(checkUniqueness){
            res.status(400).send("You can not create 2 istance of the same bookmaker!")
        }else{
            newBookmaker.save()
            res.status(200).send(newBookmaker)
        }
    } catch (error) {
        console.log(error)
    }
})

// DELETE a no-default bookmaker
bookmakersRoute.delete("/delete-bookmaker/:id", async(req, res) => {
    try {
        await bookmakerModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted!")
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = bookmakersRoute