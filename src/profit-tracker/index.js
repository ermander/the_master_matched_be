const express = require("express")
const matchModel = require("./matchSchema")
const router = express.Router()


// GET all in progress matches
router.get("/", async(req, res) => {
    try {
        const matches = await matchModel.find()
        res.status(200).send(matches)      
    } catch (error) {
        console.log("An error has occurred while fetching the in-progress matches", error)
    }
})

// GET all archived matches
router.get("/archived", async(req, res) => {
    try {
        const matches = await matchModel.find({ inCorso: "no" })
        res.status(200).send(matches)
    } catch (error) {
        console.log("An error has occurred while fetching the archived matches", error)      
    }
})

// POST a new match
router.post("/save-match", async(req, res) => {
    try {
        const newMatch = await new matchModel(req.body)
        newMatch.save() 
        res.status(201).send("SAVED!")        
    } catch (error) {
        console.log("An error has occurred while saving the new match", error)                 
    }
})

module.exports = router
