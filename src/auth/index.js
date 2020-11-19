const express = require("express")
const signUpInModel = require("./schema")
const router = express.Router()
const { registerValidation, loginValidation, auth } = require("./validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Registration route
router.post("/register", async (req, res) => {
  try {
    // Data validation 
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if the user already exists
    const emailExist = await signUpInModel.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email already exist!")

    // Hashing the password and replacing the not crypted
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashPassword

    // Saving the user
    const user = new signUpInModel(req.body)
    const savedUser = await user.save()
    res.status(201).send(savedUser)

  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

// Login route
router.post("/login", async (req, res) => {
  try {
    // Data validation 
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if the user already exists
    const user = await signUpInModel.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Email is wrong.")

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send("Password is wrong.")

    // Create and assign a token
    const accessToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.header('auth-toke', accessToken).send(accessToken)

  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
});

module.exports = router;