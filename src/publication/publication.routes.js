import { Router } from "express"
import { addPublication, deletePublication, getPublications, updatePublication } from "./publication.controller.js"
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()
api.post('/addPublication',[validateJwt], addPublication)
api.put('/updatePublication/:id', [validateJwt], updatePublication)
api.delete('/deletePublication/:id', [validateJwt], deletePublication)
api.get('/getPublication', [validateJwt], getPublications)
export default api