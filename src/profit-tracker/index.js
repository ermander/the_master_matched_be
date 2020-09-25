const express = require("express")
const matchModel = require("./matchSchema")
const router = express.Router()


// GET all in progress matches
router.get("/in-progress", async(req, res) => {
    try {
        const matches = await matchModel.find({inCorso: "yes"})
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

// PUT a current in-progress match
router.put("/modify-match/:id", async(req, res) => {
    try {
        await matchModel.findByIdAndUpdate(req.params.id, req.body);
        res.send("Updated successfully");        
    } catch (error) {
        console.log("An error has occured while modifying the match", error)
    }
})

// DELETE any in-progress (Implement even a delete for archived matches?)
router.delete("/delete-match/:id", async(req, res) => {
    try {
        await matchModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted successfully")
    } catch (error) {
        console.log("An error has occured while trying to delete the match", error)
    }
})



module.exports = router
