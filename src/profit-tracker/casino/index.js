const express = require("express")

// Schemas
const casinoModel = require("./schema")
const bookmakerModel = require("../bookmakers/schema")

const casinoRoute = express.Router()

casinoRoute.get("/casino", async(req, res) => {
    try {
        const casinoBets = await casinoModel.find()
        if(casinoBets){
            res.status(200).send(casinoBets)
        }else{
            console.log("No bets found!")
            res.status("404").send("No bets found!")
        }
    } catch (error) {
        console.log(error)
    }
})

// Save a new casino bet
casinoRoute.post("/new-casino-bet", async(req, res) => {
    try {
        const newBet = new casinoModel(req.body)
        const bookmaker = await bookmakerModel.findById({_id: req.body.bookmakerID})
        if(bookmaker && req.body.movement < 0 && (bookmaker.balance - req.body.movement) > bookmaker.balance){
            console.log("You can not lose more money then you have into the bookmaker balance!")
            res.status(400).send("You can not lose more money then you have into the bookmaker balance!")
        }else{
            // Saving che casino bet track
            newBet.bookmakerName = bookmaker.bookmakerName
            newBet.bookmakerHolder = bookmaker.holderName
            await newBet.save()
            console.log(newBet)
            // Saving the bookmaker new balance
            await bookmakerModel.findByIdAndUpdate({
                _id: bookmaker._id
            },{
                balance: bookmaker.balance + req.body.movement
            })
            res.status(200).send("OK")
        }
    } catch (error) {
        console.log(error)
    }
})

// Modify a casino bet
casinoRoute.put("/modify-casino-bet/:id", async(req, res) => {
    try {
        const data = req.body
        await casinoModel.findByIdAndUpdate({
            _id: req.params._id
        },{
            movement: data.movement,
            type: data.type
        })
    } catch (error) {
        console.log(error)
    }
})

// Delete a casino bet
casinoRoute.delete("/delete-casino-bet/:id", async(req, res) => {
    try {
        await casinoModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).send("Deleted")
    } catch (error) {
        console.log(error)
    }
})



module.exports = casinoRoute