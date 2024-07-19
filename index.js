//Ejecutar servicios
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
import {addCategoryDefault} from './src/category/category.controller.js'

initServer()
connect()
addCategoryDefault()