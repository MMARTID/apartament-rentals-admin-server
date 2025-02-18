const router = require("express").Router();

const User = require("../models/User.model.js");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

//POST "/api/auth/signup" => registra el usuario
router.post("/signup", async(req, res, next) => {

  // recibir la data del usuario
  console.log(req.body)
  const { name, email, password }  = req.body;

  // validaciones
    //0. Data existe
    if (!name || !email || !password){
      res.status(400).json('tienes que ingresar name, email y password')
      return
    }

    //1. name minimo 2 caracteres
    if (name.length < 2){
      res.status(400).json('el nombre ha de tener como minimo 2 caracteres')
      return
    }

    //2. constraseña con nivel de seguridad
    const regexPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if( regexPasswordPattern.test(password) === false ) {
      res.status(400).json({errorMessage: "La contraseña no es valida. Debe contener por lo menos una mayuscula, una minuscula y un numero. Puede conetener caracteres especiales"})
      return // detener la ejecución de la ruta
    }
    
    //3. correo electronico con formato correcto
    const regexEmailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm
    if( regexEmailPattern.test(email) === false ) {
      res.status(400).json({errorMessage: "El formato de email no es valido."})
      return // detener la ejecución de la ruta
    }

  // crear el usuario
  try {
    const encontrarUser = await User.findOne({email : email})
    
    if (encontrarUser !== null){
      res.status(400).json('Ya existe un usuario con este correo')
      return
    }

    //cifrar constraseña
    const constraseñaCifrada = await bcryptjs.hash(password, 12)

    await User.create({
     name : name,
     email : email,
     password : constraseñaCifrada
    })
   res.status(201).json('usuario creado ✅')
   
  } catch (e) {
    next(e)
  }
})

//POST "/api/auth/login" => autenticación del usuario y envio del token
router.post('/login', async (req, res, next) => {

  const { email, password } = req.body

  // los campos obligatorios
  if (!email || !password){
    res.status(400).json({errorMessage: "Correo electronico y contraseña son campos obligatorios"})
    return // detener la ejecución de la ruta
  }
 try {

   // verificar que el usuario existe en la DB
  const findUser = await User.findOne({email: email})
  if (findUser === null){
    res.status(400).json({errorMessage: 'usuario no encontrado con ese correo electronico'})
    return
  }

  // verificar que la contraseña es correcta
  const isPasswordCorrect = await bcryptjs.compare(password, findUser.password)
  if(isPasswordCorrect === false) {
    res.status(400).json({errorMessage: "La contraseña es incorrecta melón!"})
    return // detener la ejecución de la ruta
  }

  // HASTA AQUI YA HEMOS AUTENTICADO EL USUARIO🎉
  // A partir de este punto, le vamos a entregar al usuario su llave virtual🔑

  const payload = {
    _id: findUser._id,
    email: findUser.email,
    role: findUser.role
  } // el payload es toda la información estática y única que identifica el usuario

  const tokenConfig = {
    algorithm: "HS256",
    expiresIn: "7d"
  }

  const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, tokenConfig)
  
  res.status(202).json({authToken: authToken})

 } catch (e) {
  next(e)
 }
  
})

//GET "/api/auth/verify" => validación del token


module.exports = router;