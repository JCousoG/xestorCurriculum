import express from "express"
import cors from "cors"
import {DataTypes, Sequelize } from "sequelize"
import { jwt, JWT_SUBJECT, JWT_SECRET, newEmailValidationJWT, newUserAuthorizationJWT, newUserAuthenticationJWT } from "./lib/jwt.mjs"
import { error } from "console"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? "*",
    methods: process.env.CORS_METHODS ?? "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))
app.use(express.json()) 

const sequelize = new Sequelize (  process.env.NODE_ENV === "production"
? process.env.DB_URL
: 'sqlite:baseDeDatos.sqlite');

const Usuario = sequelize.define('Usuario', {
    verificado: {
        // O usuario verificou o correo mediante o enlace
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
})

const Curriculum = sequelize.define('Curriculum', {
    curriculumEnPdf: {
      type: DataTypes.TEXT
    },
    replaced: {
      // O usuario subiu un novo curriculum posteriormente
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
}
)

Usuario.hasMany(Curriculum);
Curriculum.belongsTo(Usuario);

await sequelize.sync({alter: true})

app.post("/usuarios/", async (request, response) => {
    try {
      const modeloUsuario = await Usuario.create(request.body)
      response.sendStatus(200)
      const token = newEmailValidationJWT(request.body.email)
      console.log("\n\n>>> Enlace verificación email: http://localhost:8000/verify/"+token)
      //TODO: Enviar correo con enlace de verificación, incluyendo JWT
    }
  
    catch (error) {
      console.error(error)
      response.status(500)
      response.send('Error')
    }
  })

  app.get("/verify/:jwt", async (request, response) => {
    try {
      const token = request.params.jwt
      const payload = jwt.verify(token, JWT_SECRET, {subject: JWT_SUBJECT.EMAIL_VALIDATION})
    
    if (payload) Usuario.update({verificado: true}, {where: {email: payload.email}})
    return response.send("Ok")
    }
    catch (error) {
      console.error(error)
      response.status(422)
      response.status()
    }
  })
  app.post("/curriculums/", middlewareauthorization ,async (request, response) => {
    try {
      const datosCurriculum = {...request.body, UsuarioId: response.locals.authorization.id}
      if (datosCurriculum) Curriculum.update({replaced: true}, {where: {email: request.body.email}})
      const modeloCurriculum = await Curriculum.create(datosCurriculum)
      // TODO: Marcar curriculos previos do usuario como replaced
      response.sendStatus(200)
    }
    catch (error) {
      console.error(error)
      response.status(500)
      response.send("Error")
    }
  }
  )
  app.post("/login/", async (request, response) => {
    try {
      const usuario = await Usuario.findOne({
        where: {email: request.body.email}
      })
      const token = newUserAuthenticationJWT(usuario)
      console.log("\n\n>>> Enlace verificación login: http://localhost:8000/verify-login/"+token)
      // TODO: enviar enlace por email
      response.status(200)
      response.send("Ok")
    }
    catch (error) {
      console.error(error)
      response.status(500)
      response.send('Error')
  
    }
  })

  app.get("/verify-login/:jwt", async (request, response) => {
    try {
      const token = request.params.jwt
      const payload = jwt.verify(token, JWT_SECRET, {subject: JWT_SUBJECT.USER_AUTHENTICATION})
      if (payload) {
        const token = newUserAuthorizationJWT(payload.id)
        return response.json({token})
      }
      return response.sendStatus(401)
      
    } catch (error) {
      console.error(error)
      response.status(500)
      response.send('Error')
  
    }
  })
  app.get("/curriculums/", middlewareauthorization, async (request, response) => {
    //TODO
  })

  function middlewareauthorization(request, response, next) {
    try {
      const [_, token] = request.headers.authorization.split(" ")
      const payload = jwt.verify(token, JWT_SECRET, {subject: JWT_SUBJECT.USER_AUTHORIZATION})
      response.locals.authorization = payload
      return next()
  } catch (error) {
      resposta.sendStatus(403)
  }
  }


  app.listen(process.env.PORT ?? 8000, ()=>{
    console.log("Backend funcionando...")
    console.log("NODE_ENV", process.env.NODE_ENV)
    console.log("PORT", process.env.PORT)
})

export {Usuario}