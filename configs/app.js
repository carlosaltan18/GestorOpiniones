'use strict'

import express from 'express'
import { config } from "dotenv"

//imports de las rutas 
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
//Configuración 
const app = express()
config()
const port = process.env.PORT || 3056

//Configuración del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes 
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/publication', publicationRoutes)
app.use('/comment', commentRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}