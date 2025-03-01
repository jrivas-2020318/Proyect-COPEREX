import { Router } from 'express'
import { getAll, get, save, update } from "./category.controller.js"
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { categoryValidator, updateEnterpriseValidator } from '../../helpers/validators.js'

const api = Router()

api.get('/', [validateJwt], getAll)

api.get('/:id', [validateJwt], get)

api.post('/createCategory', [validateJwt, isAdmin, categoryValidator], save)
export default api
