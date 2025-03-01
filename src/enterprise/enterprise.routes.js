import { Router } from 'express'
import {
    getCompany,
    registerCompany,
    editCompany,
    getCompanyYearExperience,
    getCompanyAsc,
    getCompanyDesc
} from './enterprise.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { enterpriseValidator, updateEnterpriseValidator } from '../../helpers/validators.js'

const api = Router()

api.get('/', [validateJwt], getCompany)
api.get('/getCompanyYearExperience', [validateJwt], getCompanyYearExperience)
api.get('/getCompanyDesc', [validateJwt], getCompanyDesc)
api.get('/getCompanyAsc', [validateJwt], getCompanyAsc)

api.post('/createCompany', [validateJwt, isAdmin, enterpriseValidator], registerCompany)

api.put('/:id', [validateJwt, isAdmin, updateEnterpriseValidator], editCompany)

export default api;
