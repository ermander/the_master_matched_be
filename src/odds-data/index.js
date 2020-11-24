const express = require("express")
const router = express.Router();
const axios = require("axios")
const url = "https://jobista.altervista.org/api.php?cookies=cookie: "
const fs = require("fs-extra")
const oddsModel = require("./schema")
const dutchModel = require("./dutchSchema")

// GET all available odds for oddsmatcher
router.get("/oddsmatcher", async(req, res) => {
    try {
        const odds = await oddsModel.find()
        res.status(200).send(odds)     
    } catch (error) {
        console.log(error)
        res.send(error)        
    }
})

// GET all available odds for dutcher
router.get("/dutcher", async(req, res) => {
    try {
        const odds = await dutchModel.find()
        res.status(200).send(odds)     
    } catch (error) {
        console.log(error)
        res.send(error)        
    }
})

router.post("/write-file", async (req, res) => {
    try {
        console.log(req.body)
        const odds = new oddsModel(req.body)
        await odds.save()
        console.log('success!')
    } catch (error) {
        console.log(error)
    }
})

router.post("/write-filee", async (req, res) => {
    try {
        console.log(req.body)
        const odds = new dutchModel(req.body)
        await odds.save()
        console.log('success!')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;