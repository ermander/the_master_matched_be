// Validation
const Joi = require("@hapi/joi")
const jwt = require("jsonwebtoken")

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object(
        {
          nickname: Joi.string().min(6).required(),
          email: Joi.string().min(3).required().email(),
          password: Joi.string().min(6).required(),    
        }
    )
    return schema.validate(data)
}

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),    
  })
  return schema.validate(data)
}

// Private routes validations
const auth = (req, res, next) => {
  const token = req.header('auth-tokem')
  if(token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (err) {
    console.log(err)
    res.status(400).send('Invalid Token')
  }
}

module.exports = { registerValidation, loginValidation, auth }
