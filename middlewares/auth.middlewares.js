const jwt = require("jsonwebtoken")

function verifyToken (req, res, next) {

  try {
    
    console.log('ejecutando middleware')
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    // si comprueba que el token es valido,c ontinua con el next()
    // si comprueba que el token NO es valido, se meuve al catch()
    // si el token es valido, nos devuelve la info de ese usuario
    console.log(payload)
    req.payload = payload

    next() // continua con la ruta //! En los middlewares, los "next()" son obligatorios

  } catch (error) {
    res.status(401).json({errorMessage: "Token no valido o no existe"})
  }
}

module.exports = {
    verifyToken
}