const express = require("express")
const router = express.Router();
const axios = require("axios")
const url = "https://jobista.altervista.org/api.php?cookies=cookie: _ga=GA1.2.1943054744.1600348951; _gid=GA1.2.1807594624.1600348951; cookieconsent_status=dismiss; flarum_remember=VPSjTzhtbIkBVSVYJNvfnup7fSycdWGgZUIEqwVU; wordpress_logged_in_fa686efef513bdb6e3e44099da671de0=ermander%7C1600521762%7CF4ESYRsKbCx1I7QJSYOUoy9JMDu4WHjdiCRlft2pglR%7C5d711be36cde1e3778662a2b0f26c971a9ff1cbf00d71cad8a9d5173149a1909; __cfduid=d62c6ef5f530039c3adb867f90a4ded361600353024"

// Single GET to fetch all current available odds data
router.get("/", async(req, res) => {
    try {
        const response = await axios(url)
        console.log(response)
        const parsedResponse = await response.json()
        res.status(200).send(parsedResponse)        
    } catch (error) {
        console.log(error)
        res.send(error)        
    }
})

module.exports = router;