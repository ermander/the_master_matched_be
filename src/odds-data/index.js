const express = require("express")
const router = express.Router();
const axios = require("axios")
const url = "https://jobista.altervista.org/api.php?cookies=cookie: "


// GET all available odds for oddsmtcher
router.get("/oddsmatcher", async(req, res) => {
    try {
        const response = await axios(url + process.env.ROBIN_ODDS_COOKIE)
        console.log(response)
        const parsedResponse = await response.json()
        res.status(200).send(parsedResponse)        
    } catch (error) {
        console.log(error)
        res.send(error)        
    }
})

module.exports = router;