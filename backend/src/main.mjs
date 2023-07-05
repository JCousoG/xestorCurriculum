import express, { response } from "express"
import cors from "cors"
import {DataTypes, Sequelize } from "sequelize"

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
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING
    }
})

const Curriculum = sequelize.define('Curriculum', {
    curriculumEnPdf: {
      type: DataTypes.TEXT ('long')
    }
}
)
Usuario.hasMany(Curriculum);
Curriculum.belongsTo(Usuario);
await sequelize.sync({alter: true})
app.post("/usuarios/", async (request, response) => {
    try {
      const modeloUsuario = await Usuario.create(request.body)
  
      response.setHeader("Content-Type", "application/json")
      response.sendStatus(200)
    }
  
    catch (error) {
      console.error(error)
      response.status(500)
      response.send('Error')
    }
  })
  app.post("/curriculums/", middlewareauthorization ,async (request, response) => {
    try {
      const datosCurriculum = {...request.body, UsuarioEmail: response.locals.authorization.email}
      const modeloCurriculum = await Curriculum.create(datosCurriculum)
  
      response.setHeader("Content-Type", "application/pdf")
      response.sendStatus(200)
    }
    catch (error) {
      console.error(error)
      response.status(500)
      response.send("Error")
    }
  }
  )
  app.get("/curriculums/", middlewareauthorization, async (request, response) => {
    
  })
  function middlewareauthorization(request, response, next) {
    try {
      const [_, token] = request.headers.authorization.split(" ")
      const payload = jwt.verify(token, process.env.JWT_SECRET, {subject: "email-verification"})
      response.locals.authorization = datosAutorizacion
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