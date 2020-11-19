const express = require("express")

// Schemas
const bookmakerModel = require("./schema")
const paymentMethodModel = require("../payments/schema")
const userModel = require("../users/userSchema")
const defaultBookmakerModel = require("./defaultBookmakerSchema")
const paymentMethodsModel = require("../payments/schema")
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
        const checkUniqueness = await defaultBookmakerModel.findOne({bookmakerName: req.body.bookmakerName})
        if(checkUniqueness){
            res.status(401).send("You can not create a dupplicate of a bookmaker!")
        }else{
            const newDefaultBookmaker = new defaultBookmakerModel(req.body)
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
        }
        
        if(req.body.bookmakerName == "Tutti"){
            const allBookmakers = await defaultBookmakerModel.find()
            console.log(allBookmakers)
            for(let i=0; i<allBookmakers.length; i++){
                let newBookmaker = new bookmakerModel(req.body)
                newBookmaker.holderID = req.body.holderID
                newBookmaker.bookmakerName = allBookmakers[i].bookmakerName.toLowerCase()
                await newBookmaker.save()
            }            
            res.status(200).send("ok")
        }else{
            let newBookmaker = new bookmakerModel(req.body)
            newBookmaker.holderID = req.body.holderID
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

// PUT a transaction between a payment method and a bookmaker
bookmakersRoute.put("/deposit-into-bookmaker", async(req, res) => {
    try {
        const bookmaker = await bookmakerModel.findById({_id: req.body.receiver})
        const paymentMethod = await paymentMethodModel.findById({_id: req.body.sender})
        const movement = req.body.movement
        const paymentMethodBalance = parseInt(paymentMethod.balance)
        const bookmakerBalance = parseInt(bookmaker.balance)

        // Caso di sovradeposito
        if(req.body.type==="Deposito" && movement > paymentMethodBalance){
            console.log("You have not enought credit into the payment method!")
            res.status(400).send("You have not enought credit into the payment method!")
        }
        // Caso di over prelievo
        else if(req.body.type==="Prelievo" && movement > bookmakerBalance){
            console.log("You can not withdraw someting you don't have!")
            res.status(400).send("You can not withdraw something you don't have!")
        }
        //Caso di deposito
        else if(req.body.type==="Deposito"){
            await bookmakerModel.findByIdAndUpdate({
                _id: bookmaker._id
            },
            {
                balance: bookmakerBalance + movement
            })

            await paymentMethodModel.findByIdAndUpdate({
                _id: paymentMethod._id
            },{
                balance: paymentMethodBalance - movement
            })
            res.status(200).send("OK")
        }
        // Caso di prelievo
        else if(req.body.type==="Prelievo"){
            await bookmakerModel.findByIdAndUpdate({
                _id: bookmaker._id
            },
            {
                balance: bookmakerBalance - movement
            })

            await paymentMethodModel.findByIdAndUpdate({
                _id: paymentMethod._id
            },{
                balance: paymentMethodBalance + movement
            })
            res.status(200).send("OK")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = bookmakersRoute