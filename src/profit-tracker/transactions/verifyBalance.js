const transactionModel = require("./schema");

const verifyBalance = async(req, res, next) => {
  try {
    const from = req.body
    const to = await transactionModel.findById({ _id: from.id })

    if((to.balance - from.movement) < 0){
      const error = new Error("Il tuo saldo non può essere negativo!")
      throw error
    }else if((from.balance - from.transaction) < 0){
      const error = new Error("Non puoi inviare più soldi di quelli presenti nel conto!")
      throw error
    }

  } catch (error) {
    const err = new Error("Bad request")
    err.httpStatusCode = 400
    next(err)
  }
}

module.exports = { verifyBalance }